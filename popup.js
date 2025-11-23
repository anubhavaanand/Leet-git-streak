// popup.js - Handles the popup UI interactions

document.addEventListener('DOMContentLoaded', async () => {
  const saveBtn = document.getElementById('saveBtn');
  const githubToken = document.getElementById('githubToken');
  const repoOwner = document.getElementById('repoOwner');
  const repoName = document.getElementById('repoName');
  const statusDiv = document.getElementById('status');
  const leetcodeStreakEl = document.getElementById('leetcodeStreak');
  const syncedDaysEl = document.getElementById('syncedDays');

  // Load saved configuration
  const config = await chrome.storage.sync.get([
    'githubToken',
    'repoOwner',
    'repoName',
    'leetcodeStreak',
    'syncedDays'
  ]);

  if (config.githubToken) {
    githubToken.value = config.githubToken;
  }
  if (config.repoOwner) {
    repoOwner.value = config.repoOwner;
  }
  if (config.repoName) {
    repoName.value = config.repoName;
  }

  // Update stats
  leetcodeStreakEl.textContent = config.leetcodeStreak || '-';
  syncedDaysEl.textContent = config.syncedDays || '0';

  // Update status
  updateStatus(config.githubToken && config.repoOwner && config.repoName);

  // Save configuration
  saveBtn.addEventListener('click', async () => {
    const token = githubToken.value.trim();
    const owner = repoOwner.value.trim();
    const repo = repoName.value.trim();

    if (!token || !owner || !repo) {
      alert('Please fill in all fields');
      return;
    }

    // Save to storage
    await chrome.storage.sync.set({
      githubToken: token,
      repoOwner: owner,
      repoName: repo
    });

    // Notify background script
    chrome.runtime.sendMessage({
      action: 'configUpdated',
      config: { githubToken: token, repoOwner: owner, repoName: repo }
    });

    updateStatus(true);
    alert('Configuration saved! The extension will now sync your LeetCode streak to GitHub.');
  });

  function updateStatus(isConfigured) {
    if (isConfigured) {
      statusDiv.textContent = 'Status: Active ✓';
      statusDiv.className = 'status active';
    } else {
      statusDiv.textContent = 'Status: Not Configured';
      statusDiv.className = 'status inactive';
    }
  }
});
