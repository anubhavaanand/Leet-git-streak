// Popup script for configuration and status
document.addEventListener('DOMContentLoaded', async () => {
  // Load saved configuration
  await loadConfig();
  
  // Load status
  await loadStatus();
  
  // Event listeners
  document.getElementById('saveConfig').addEventListener('click', saveConfig);
  document.getElementById('testConnection').addEventListener('click', testConnection);
  document.getElementById('manualCommit').addEventListener('click', manualCommit);
});

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
    document.getElementById('githubToken').value = result.githubToken;
  }
  if (result.repoOwner) {
    document.getElementById('repoOwner').value = result.repoOwner;
  }
  if (result.repoName) {
    document.getElementById('repoName').value = result.repoName;
  }
  if (result.branch) {
    document.getElementById('branch').value = result.branch;
  }
  if (result.filePath) {
    document.getElementById('filePath').value = result.filePath;
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
  
  // Validate
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
  
  // Check configuration
  const config = await chrome.storage.sync.get([
    'githubToken',
    'repoOwner',
    'repoName'
  ]);
  
  if (!config.githubToken || !config.repoOwner || !config.repoName) {
    statusBox.className = 'status-box error';
    statusBox.innerHTML = '<p>⚠️ Configuration incomplete. Please set up your GitHub credentials.</p>';
    return;
  }
  
  statusBox.className = 'status-box success';
  statusBox.innerHTML = '<p>✅ Configuration complete. Extension is active.</p>';
  
  // Get last commit date
  const lastCommit = await chrome.storage.local.get('lastCommitDate');
  if (lastCommit.lastCommitDate) {
    lastCommitEl.textContent = lastCommit.lastCommitDate;
  } else {
    lastCommitEl.textContent = 'Never';
  }
  
  // Try to get current streak from LeetCode page
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url && tab.url.includes('leetcode.com')) {
      chrome.tabs.sendMessage(tab.id, { type: 'GET_STREAK' }, (response) => {
        if (response && response.streak) {
          currentStreakEl.textContent = `${response.streak} days`;
        } else if (response && response.hasActivity) {
          currentStreakEl.textContent = 'Active';
        } else {
          currentStreakEl.textContent = 'Not detected';
        }
      });
    } else {
      currentStreakEl.textContent = 'Open LeetCode to detect';
    }
  } catch (error) {
    currentStreakEl.textContent = 'Not detected';
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
    // Get streak data from current tab if on LeetCode
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
  messageEl.textContent = text;
  messageEl.className = `message ${type} show`;
  
  setTimeout(() => {
    messageEl.classList.remove('show');
  }, 5000);
}

