// Popup script with setup wizard
let currentStep = 1;
const totalSteps = 3;

document.addEventListener('DOMContentLoaded', async () => {
  // Check if setup is complete
  const config = await chrome.storage.sync.get(['githubToken', 'repoOwner', 'repoName', 'setupComplete']);
  
  if (!config.setupComplete || !config.githubToken || !config.repoOwner || !config.repoName) {
    // Show setup wizard
    showWizard();
  } else {
    // Show main interface
    showMainInterface();
    await loadStatus();
  }
  
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Wizard navigation
  document.getElementById('verifyToken')?.addEventListener('click', verifyToken);
  document.getElementById('nextStep1')?.addEventListener('click', () => goToStep(2));
  document.getElementById('prevStep2')?.addEventListener('click', () => goToStep(1));
  document.getElementById('nextStep2')?.addEventListener('click', () => goToStep(3));
  document.getElementById('prevStep3')?.addEventListener('click', () => goToStep(2));
  document.getElementById('finishSetup')?.addEventListener('click', finishSetup);
  
  // Token input validation
  document.getElementById('wizardToken')?.addEventListener('input', (e) => {
    const nextBtn = document.getElementById('nextStep1');
    if (nextBtn) {
      nextBtn.disabled = !e.target.value.trim();
    }
  });
  
  // Main interface
  document.getElementById('saveConfig')?.addEventListener('click', saveConfig);
  document.getElementById('testConnection')?.addEventListener('click', testConnection);
  document.getElementById('quickCommit')?.addEventListener('click', manualCommit);
  document.getElementById('editConfig')?.addEventListener('click', () => {
    const panel = document.getElementById('configPanel');
    if (panel) {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      loadConfig();
    }
  });
}

// Show wizard
function showWizard() {
  const wizard = document.getElementById('setupWizard');
  const main = document.getElementById('mainInterface');
  if (wizard) wizard.style.display = 'block';
  if (main) main.style.display = 'none';
  goToStep(1);
}

// Show main interface
function showMainInterface() {
  const wizard = document.getElementById('setupWizard');
  const main = document.getElementById('mainInterface');
  if (wizard) wizard.style.display = 'none';
  if (main) main.style.display = 'block';
}

// Navigate to step
function goToStep(step) {
  currentStep = step;
  
  // Hide all steps
  document.querySelectorAll('.wizard-step').forEach(s => {
    s.classList.remove('active');
  });
  
  // Show current step
  const currentStepEl = document.querySelector(`.wizard-step[data-step="${step}"]`);
  if (currentStepEl) {
    currentStepEl.classList.add('active');
  }
  
  // Update step indicator
  updateStepIndicator(step);
}

// Update step indicator
function updateStepIndicator(step) {
  const indicators = document.querySelectorAll('.step-indicator .step');
  indicators.forEach((indicator, index) => {
    indicator.classList.remove('active', 'completed');
    if (index + 1 < step) {
      indicator.classList.add('completed');
      indicator.textContent = '✓';
    } else if (index + 1 === step) {
      indicator.classList.add('active');
      indicator.textContent = index + 1;
    } else {
      indicator.textContent = index + 1;
    }
  });
}

// Verify GitHub token and extract username
async function verifyToken() {
  const tokenInput = document.getElementById('wizardToken');
  const token = tokenInput?.value.trim();
  
  if (!token) {
    showWizardMessage('Please enter a GitHub token', 'error');
    return;
  }
  
  showWizardMessage('Verifying token...', 'info');
  
  try {
    // Verify token and get user info
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Leet-Git-Streak-Extension'
      }
    });
    
    if (response.ok) {
      const userData = await response.json();
      const username = userData.login;
      
      // Auto-fill username
      const repoOwnerInput = document.getElementById('wizardRepoOwner');
      if (repoOwnerInput) {
        repoOwnerInput.value = username;
      }
      
      // Store token temporarily
      await chrome.storage.sync.set({ tempToken: token, tempUsername: username });
      
      showWizardMessage('✅ Token verified! Username detected: ' + username, 'success');
      document.getElementById('nextStep1').disabled = false;
    } else {
      const error = await response.json();
      showWizardMessage('❌ Invalid token: ' + (error.message || 'Please check your token'), 'error');
    }
  } catch (error) {
    showWizardMessage('❌ Error verifying token: ' + error.message, 'error');
  }
}

// Finish setup
async function finishSetup() {
  const tempData = await chrome.storage.sync.get(['tempToken', 'tempUsername']);
  const token = tempData.tempToken || document.getElementById('wizardToken')?.value.trim();
  const repoOwner = document.getElementById('wizardRepoOwner')?.value.trim() || tempData.tempUsername;
  const repoName = document.getElementById('wizardRepoName')?.value.trim() || 'leetcode-streak';
  const branch = document.getElementById('wizardBranch')?.value.trim() || 'main';
  const filePath = document.getElementById('wizardFilePath')?.value.trim() || 'leetcode-streak.md';
  
  if (!token || !repoOwner || !repoName) {
    showWizardMessage('Please fill in all required fields', 'error');
    return;
  }
  
  showWizardMessage('Saving configuration...', 'info');
  
  try {
    // Save configuration
    await chrome.storage.sync.set({
      githubToken: token,
      repoOwner: repoOwner,
      repoName: repoName,
      branch: branch,
      filePath: filePath,
      setupComplete: true
    });
    
    // Clean up temp data
    await chrome.storage.sync.remove(['tempToken', 'tempUsername']);
    
    // Test connection
    const testResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Leet-Git-Streak-Extension'
      }
    });
    
    if (!testResponse.ok && testResponse.status === 404) {
      // Repository doesn't exist, try to create it
      showWizardMessage('Repository not found. Creating it...', 'info');
      await createRepository(token, repoOwner, repoName);
    }
    
    showWizardMessage('✅ Setup complete!', 'success');
    
    // Switch to main interface after a moment
    setTimeout(() => {
      showMainInterface();
      loadStatus();
    }, 1500);
    
  } catch (error) {
    showWizardMessage('❌ Error: ' + error.message, 'error');
  }
}

// Create repository if it doesn't exist
async function createRepository(token, owner, repoName) {
  try {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Leet-Git-Streak-Extension'
      },
      body: JSON.stringify({
        name: repoName,
        description: 'LeetCode streak tracking repository',
        private: false,
        auto_init: true
      })
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create repository');
    }
  } catch (error) {
    console.error('Error creating repository:', error);
    // Don't throw - user can create it manually
    return null;
  }
}

// Show wizard message
function showWizardMessage(text, type) {
  // Create or update message element
  let messageEl = document.querySelector('.wizard-message');
  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.className = 'wizard-message';
    const content = document.querySelector('.wizard-content');
    if (content) {
      content.appendChild(messageEl);
    }
  }
  
  messageEl.textContent = text;
  messageEl.className = `wizard-message ${type} show`;
  
  setTimeout(() => {
    messageEl.classList.remove('show');
  }, 5000);
}

// Load configuration from storage
async function loadConfig() {
  const result = await chrome.storage.sync.get([
    'githubToken',
    'repoOwner',
    'repoName',
    'branch',
    'filePath'
  ]);
  
  if (result.githubToken) {
    const tokenEl = document.getElementById('githubToken');
    if (tokenEl) tokenEl.value = result.githubToken;
  }
  if (result.repoOwner) {
    const ownerEl = document.getElementById('repoOwner');
    if (ownerEl) ownerEl.value = result.repoOwner;
  }
  if (result.repoName) {
    const nameEl = document.getElementById('repoName');
    if (nameEl) nameEl.value = result.repoName;
  }
  if (result.branch) {
    const branchEl = document.getElementById('branch');
    if (branchEl) branchEl.value = result.branch;
  }
  if (result.filePath) {
    const pathEl = document.getElementById('filePath');
    if (pathEl) pathEl.value = result.filePath;
  }
}

// Save configuration
async function saveConfig() {
  const config = {
    githubToken: document.getElementById('githubToken').value.trim(),
    repoOwner: document.getElementById('repoOwner').value.trim(),
    repoName: document.getElementById('repoName').value.trim(),
    branch: document.getElementById('branch').value.trim() || 'main',
    filePath: document.getElementById('filePath').value.trim() || 'leetcode-streak.md'
  };
  
  if (!config.githubToken || !config.repoOwner || !config.repoName) {
    showMessage('Please fill in all required fields', 'error');
    return;
  }
  
  try {
    await chrome.storage.sync.set(config);
    showMessage('Configuration saved successfully!', 'success');
    await loadStatus();
  } catch (error) {
    showMessage('Error saving configuration: ' + error.message, 'error');
  }
}

// Load status
async function loadStatus() {
  const statusBox = document.getElementById('status');
  const lastCommitEl = document.getElementById('lastCommit');
  const currentStreakEl = document.getElementById('currentStreak');
  const repoInfoEl = document.getElementById('repoInfo');
  
  const config = await chrome.storage.sync.get([
    'githubToken',
    'repoOwner',
    'repoName'
  ]);
  
  if (!config.githubToken || !config.repoOwner || !config.repoName) {
    if (statusBox) {
      statusBox.className = 'status-box error';
      statusBox.innerHTML = '<p>⚠️ Configuration incomplete.</p>';
    }
    return;
  }
  
  if (statusBox) {
    statusBox.className = 'status-box success';
    statusBox.innerHTML = '<p>✅ Extension is active and ready!</p>';
  }
  
  if (repoInfoEl) {
    repoInfoEl.textContent = `${config.repoOwner}/${config.repoName}`;
  }
  
  const lastCommit = await chrome.storage.local.get('lastCommitDate');
  if (lastCommitEl) {
    if (lastCommit.lastCommitDate) {
      lastCommitEl.textContent = lastCommit.lastCommitDate;
    } else {
      lastCommitEl.textContent = 'Never';
    }
  }
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url && tab.url.includes('leetcode.com')) {
      chrome.tabs.sendMessage(tab.id, { type: 'GET_STREAK' }, (response) => {
        if (currentStreakEl) {
          if (response && response.streak) {
            currentStreakEl.textContent = `${response.streak} days`;
          } else if (response && response.hasActivity) {
            currentStreakEl.textContent = 'Active';
          } else {
            currentStreakEl.textContent = 'Not detected';
          }
        }
      });
    } else {
      if (currentStreakEl) {
        currentStreakEl.textContent = 'Open LeetCode to detect';
      }
    }
  } catch (error) {
    if (currentStreakEl) {
      currentStreakEl.textContent = 'Not detected';
    }
  }
}

// Test GitHub connection
async function testConnection() {
  const config = await chrome.storage.sync.get([
    'githubToken',
    'repoOwner',
    'repoName'
  ]);
  
  if (!config.githubToken || !config.repoOwner || !config.repoName) {
    showMessage('Please configure GitHub credentials first', 'error');
    return;
  }
  
  showMessage('Testing connection...', 'info');
  
  try {
    const response = await fetch(`https://api.github.com/repos/${config.repoOwner}/${config.repoName}`, {
      headers: {
        'Authorization': `token ${config.githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Leet-Git-Streak-Extension'
      }
    });
    
    if (response.ok) {
      showMessage('✅ Connection successful! Repository is accessible.', 'success');
    } else {
      const error = await response.json();
      showMessage(`❌ Connection failed: ${error.message || response.statusText}`, 'error');
    }
  } catch (error) {
    showMessage(`❌ Connection error: ${error.message}`, 'error');
  }
}

// Manual commit creation
async function manualCommit() {
  const config = await chrome.storage.sync.get([
    'githubToken',
    'repoOwner',
    'repoName'
  ]);
  
  if (!config.githubToken || !config.repoOwner || !config.repoName) {
    showMessage('Please configure GitHub credentials first', 'error');
    return;
  }
  
  showMessage('Creating commit...', 'info');
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let streakData = { streak: null, hasActivity: true, timestamp: new Date().toISOString() };
    
    if (tab.url && tab.url.includes('leetcode.com')) {
      chrome.tabs.sendMessage(tab.id, { type: 'GET_STREAK' }, async (response) => {
        if (response) {
          streakData = response;
        }
        await triggerCommit(streakData);
      });
    } else {
      await triggerCommit(streakData);
    }
  } catch (error) {
    showMessage(`Error: ${error.message}`, 'error');
  }
}

// Trigger commit via background script
async function triggerCommit(streakData) {
  chrome.runtime.sendMessage({
    type: 'CREATE_COMMIT',
    data: streakData
  }, (response) => {
    if (response && response.success) {
      showMessage('✅ Commit created successfully!', 'success');
      loadStatus();
    } else {
      showMessage(`❌ Failed to create commit: ${response?.error || 'Unknown error'}`, 'error');
    }
  });
}

// Show message
function showMessage(text, type) {
  const messageEl = document.getElementById('message');
  if (!messageEl) return;
  
  messageEl.textContent = text;
  messageEl.className = `message ${type} show`;
  
  setTimeout(() => {
    messageEl.classList.remove('show');
  }, 5000);
}
