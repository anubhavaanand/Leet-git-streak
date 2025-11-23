# Installation Guide

## Step-by-Step Installation

### 1. Install the Extension

#### Chrome/Edge/Brave/Opera
1. Download or clone this repository to your local machine
2. Open your browser and navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
   - Opera: `opera://extensions/`
3. Enable **Developer mode** (toggle switch usually in top-right corner)
4. Click **"Load unpacked"** button
5. Browse to and select the extension directory
6. The extension should now appear in your extensions list

### 2. Create GitHub Personal Access Token

1. Go to GitHub: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give your token a descriptive name: `LeetCode Streak Extension`
4. Set expiration (recommended: 90 days or no expiration for convenience)
5. Select the following scope:
   - ✅ **repo** (Full control of private repositories)
6. Click **"Generate token"** at the bottom
7. **IMPORTANT**: Copy the token immediately (you won't see it again!)

### 3. Configure the Extension

1. Click the extension icon in your browser toolbar (you may need to pin it first)
2. In the popup window:
   - **GitHub Personal Access Token**: Paste the token you just created
   - **GitHub Username**: Your GitHub username (e.g., `octocat`)
   - **Repository Name**: Choose a name for your streak repo (e.g., `leetcode-streak`)
     - If this repository doesn't exist, the extension will create it automatically
     - If it exists, the extension will use it
3. Click **"Save Configuration"**
4. You should see "Status: Active ✓"

### 4. Start Using

1. Visit https://leetcode.com
2. Log in to your LeetCode account
3. Solve problems as you normally would
4. The extension will automatically:
   - Detect when you solve problems
   - Create commits in your GitHub repository
   - Maintain your GitHub streak

### 5. Verify It's Working

1. Solve a LeetCode problem
2. You should see a browser notification: "LeetCode Streak Synced!"
3. Visit your GitHub repository (e.g., `github.com/yourusername/leetcode-streak`)
4. Check the `streak/` directory for today's date file
5. Check your GitHub contribution graph - you should see a green square for today!

## Troubleshooting

### Extension Not Syncing?

1. **Check Token Permissions**
   - Make sure your token has `repo` scope
   - Try generating a new token

2. **Check Repository**
   - Make sure the repository name doesn't contain special characters
   - Try using a simple name like `leetcode-streak`

3. **Check Browser Console**
   - Right-click extension icon → Inspect popup
   - Check for error messages in the console

4. **Check Background Worker**
   - Go to `chrome://extensions/`
   - Find "LeetCode to GitHub Streak"
   - Click "Inspect views: service worker"
   - Check console for errors

### Not Detecting LeetCode Activity?

1. **Refresh the LeetCode page** after installing the extension
2. **Make sure you're logged in** to LeetCode
3. **Try solving a problem** and check if notification appears
4. Check browser console on LeetCode page for errors

### Already Synced Today?

The extension syncs once per day to avoid duplicate commits. If you've already synced today, you'll need to wait until tomorrow for the next sync.

## Security Notes

- Your GitHub token is stored **locally** in your browser's secure storage
- The token is **never sent to any third-party servers**
- Only your browser communicates directly with GitHub API
- You can revoke the token anytime at https://github.com/settings/tokens

## Need Help?

- Open an issue on GitHub: [GitHub Issues](https://github.com/anubhavaanand/Leet-git-streak/issues)
- Check the README.md for more information
- Make sure you're using a Chromium-based browser (Chrome, Edge, Brave, Opera)
