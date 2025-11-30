// Background service worker for GitHub integration
chrome.runtime.onInstalled.addListener(() => {
  console.log('Leet-Git Streak extension installed');
});

// Listen for streak detection from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'STREAK_DETECTED') {
    handleStreakDetected(request.data);
    sendResponse({ success: true });
  }
  return true;
});

// Handle streak detection
async function handleStreakDetected(streakData) {
  try {
    const config = await getConfig();
    
    if (!config.githubToken || !config.repoOwner || !config.repoName) {
      console.log('GitHub not configured yet');
      return;
    }

    // Check if we've already committed today
    const today = new Date().toDateString();
    const lastCommit = await chrome.storage.local.get('lastCommitDate');
    
    if (lastCommit.lastCommitDate === today) {
      console.log('Already committed today');
      return;
    }

    // Create GitHub commit
    await createGitHubCommit(config, streakData);
    
    // Update last commit date
    await chrome.storage.local.set({ lastCommitDate: today });
    
    console.log('GitHub commit created successfully');
  } catch (error) {
    console.error('Error handling streak:', error);
  }
}

// Get extension configuration
async function getConfig() {
  const result = await chrome.storage.sync.get([
    'githubToken',
    'repoOwner',
    'repoName',
    'branch',
    'filePath'
  ]);
  
  return {
    githubToken: result.githubToken || '',
    repoOwner: result.repoOwner || '',
    repoName: result.repoName || '',
    branch: result.branch || 'main',
    filePath: result.filePath || 'leetcode-streak.md'
  };
}

// Create a GitHub commit
async function createGitHubCommit(config, streakData) {
  const { githubToken, repoOwner, repoName, branch, filePath } = config;
  
  // Get current file content or create new
  const fileUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  const headers = {
    'Authorization': `token ${githubToken}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Leet-Git-Streak-Extension'
  };

  let sha = null;
  let currentContent = '';

  try {
    // Try to get existing file
    const response = await fetch(fileUrl, { headers });
    if (response.ok) {
      const fileData = await response.json();
      sha = fileData.sha;
      currentContent = atob(fileData.content.replace(/\s/g, ''));
    }
  } catch (error) {
    // File doesn't exist yet, that's okay
    console.log('File does not exist, will create new one');
  }

  // Update content with new streak entry
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toISOString();
  const streakEntry = `## ${date}\n\n- **Time**: ${time}\n- **Streak**: ${streakData.streak || 'Active'}\n- **Activity**: LeetCode problem solved\n\n---\n\n`;
  
  const newContent = currentContent + streakEntry;
  const encodedContent = btoa(unescape(encodeURIComponent(newContent)));

  // Create or update file
  const commitMessage = `LeetCode streak update - ${date}`;
  const commitData = {
    message: commitMessage,
    content: encodedContent,
    branch: branch
  };

  if (sha) {
    commitData.sha = sha;
  }

  const commitResponse = await fetch(fileUrl, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commitData)
  });

  if (!commitResponse.ok) {
    const error = await commitResponse.json();
    throw new Error(`GitHub API error: ${error.message || commitResponse.statusText}`);
  }

  return await commitResponse.json();
}

// Expose function for manual trigger from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CREATE_COMMIT') {
    handleStreakDetected(request.data).then(() => {
      sendResponse({ success: true });
    }).catch((error) => {
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }
});

