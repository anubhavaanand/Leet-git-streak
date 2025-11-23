// background.js - Background service worker

// GitHub API helper functions
class GitHubAPI {
  constructor(token, owner, repo) {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
    this.baseURL = 'https://api.github.com';
  }

  async request(endpoint, method = 'GET', body = null) {
    const options = {
      method: method,
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `GitHub API error: ${response.status}`);
    }

    return await response.json();
  }

  // Check if repository exists
  async checkRepo() {
    try {
      await this.request(`/repos/${this.owner}/${this.repo}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Create repository if it doesn't exist
  async createRepo() {
    try {
      const body = {
        name: this.repo,
        description: 'LeetCode streak tracker - automatically maintained by LeetCode to GitHub Streak extension',
        auto_init: true,
        private: false
      };
      
      await this.request('/user/repos', 'POST', body);
      console.log('Repository created successfully');
      return true;
    } catch (error) {
      console.error('Error creating repository:', error);
      return false;
    }
  }

  // Get the default branch
  async getDefaultBranch() {
    const repo = await this.request(`/repos/${this.owner}/${this.repo}`);
    return repo.default_branch || 'main';
  }

  // Get the latest commit SHA
  async getLatestCommitSHA(branch) {
    const ref = await this.request(`/repos/${this.owner}/${this.repo}/git/refs/heads/${branch}`);
    return ref.object.sha;
  }

  // Create or update a file
  async createOrUpdateFile(path, content, message) {
    try {
      // Check if file exists
      let sha = null;
      try {
        const file = await this.request(`/repos/${this.owner}/${this.repo}/contents/${path}`);
        sha = file.sha;
      } catch (error) {
        // File doesn't exist, will create new
      }

      const body = {
        message: message,
        content: btoa(content), // Base64 encode
        sha: sha // Only needed for updates
      };

      await this.request(`/repos/${this.owner}/${this.repo}/contents/${path}`, 'PUT', body);
      console.log('File created/updated successfully');
      return true;
    } catch (error) {
      console.error('Error creating/updating file:', error);
      return false;
    }
  }

  // Create a commit for LeetCode activity
  async createStreakCommit(problemName = null) {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0];
    
    let message = `LeetCode daily activity - ${date}`;
    let content = `# LeetCode Activity - ${date} ${time}\n\n`;
    
    if (problemName) {
      message = `Solved: ${problemName} - ${date}`;
      content += `## Problem Solved\n${problemName}\n\n`;
    }
    
    content += `Timestamp: ${new Date().toISOString()}\n`;
    content += `Automated commit by LeetCode to GitHub Streak extension\n`;

    const filename = `streak/${date}.md`;
    return await this.createOrUpdateFile(filename, content, message);
  }
}

// State management
let config = {
  githubToken: null,
  repoOwner: null,
  repoName: null
};

let lastSyncDate = null;
let syncedDays = 0;

// Load configuration on startup
async function loadConfig() {
  const stored = await chrome.storage.sync.get([
    'githubToken',
    'repoOwner',
    'repoName',
    'lastSyncDate',
    'syncedDays'
  ]);

  config.githubToken = stored.githubToken;
  config.repoOwner = stored.repoOwner;
  config.repoName = stored.repoName;
  lastSyncDate = stored.lastSyncDate;
  syncedDays = stored.syncedDays || 0;

  console.log('Configuration loaded:', {
    hasToken: !!config.githubToken,
    owner: config.repoOwner,
    repo: config.repoName
  });
}

// Initialize repository
async function initializeRepo() {
  if (!config.githubToken || !config.repoOwner || !config.repoName) {
    console.log('Configuration incomplete, skipping initialization');
    return false;
  }

  try {
    const github = new GitHubAPI(config.githubToken, config.repoOwner, config.repoName);
    
    const exists = await github.checkRepo();
    if (!exists) {
      console.log('Repository does not exist, creating...');
      await github.createRepo();
      
      // Create README
      const readmeContent = `# LeetCode Streak Tracker\n\nThis repository automatically tracks my LeetCode daily activity.\n\n🔥 Maintained by [LeetCode to GitHub Streak Extension](https://github.com/anubhavaanand/Leet-git-streak)\n`;
      await github.createOrUpdateFile('README.md', readmeContent, 'Initialize LeetCode streak tracker');
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing repository:', error);
    return false;
  }
}

// Sync LeetCode activity to GitHub
async function syncToGitHub(problemName = null) {
  const today = new Date().toISOString().split('T')[0];
  
  // Don't sync multiple times per day
  if (lastSyncDate === today) {
    console.log('Already synced today');
    return;
  }

  if (!config.githubToken || !config.repoOwner || !config.repoName) {
    console.log('Configuration incomplete, cannot sync');
    return;
  }

  try {
    const github = new GitHubAPI(config.githubToken, config.repoOwner, config.repoName);
    
    // Ensure repo exists
    const exists = await github.checkRepo();
    if (!exists) {
      await initializeRepo();
    }

    // Create commit
    const success = await github.createStreakCommit(problemName);
    
    if (success) {
      lastSyncDate = today;
      syncedDays++;
      
      await chrome.storage.sync.set({
        lastSyncDate: lastSyncDate,
        syncedDays: syncedDays
      });

      // Show notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'LeetCode Streak Synced!',
        message: `Your LeetCode activity has been synced to GitHub for ${today}`
      });

      console.log('Successfully synced to GitHub');
    }
  } catch (error) {
    console.error('Error syncing to GitHub:', error);
    
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Sync Failed',
      message: `Failed to sync LeetCode activity: ${error.message}`
    });
  }
}

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'configUpdated') {
    config = request.config;
    initializeRepo().then(() => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (request.action === 'problemSolved') {
    console.log('Problem solved, syncing to GitHub...');
    syncToGitHub('LeetCode Problem').then(() => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (request.action === 'streakUpdate') {
    console.log('Streak update received:', request.data);
    
    // Update streak in storage
    if (request.data && request.data.streak) {
      chrome.storage.sync.set({
        leetcodeStreak: request.data.streak
      });
    }

    // If user has submission today and we haven't synced yet, sync
    if (request.data && request.data.hasSubmissionToday) {
      syncToGitHub().then(() => {
        sendResponse({ success: true });
      });
      return true;
    }
    
    sendResponse({ success: true });
    return true;
  }
});

// Set up daily check alarm
chrome.alarms.create('dailyCheck', {
  periodInMinutes: 60 // Check every hour
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyCheck') {
    // Query active tab to check if it's LeetCode
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes('leetcode.com')) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getStreakData' }, (response) => {
          if (response && response.hasSubmissionToday) {
            syncToGitHub();
          }
        });
      }
    });
  }
});

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('LeetCode to GitHub Streak extension installed');
  loadConfig().then(() => {
    if (config.githubToken && config.repoOwner && config.repoName) {
      initializeRepo();
    }
  });
});

// Load config on startup
loadConfig();
