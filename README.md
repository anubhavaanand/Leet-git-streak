# 🔥 Leet-Git Streak

A browser extension that automatically transfers your LeetCode streaks into GitHub streaks effortlessly. Never lose your GitHub contribution streak again!

## Features

- 🔍 **Automatic Detection**: Monitors your LeetCode activity and detects when you solve problems
- 🔄 **Auto-Sync**: Automatically creates GitHub commits when you solve LeetCode problems
- ⚙️ **Easy Configuration**: Simple setup through the extension popup
- 📊 **Status Tracking**: View your current streak and last commit status
- 🎯 **Manual Control**: Create commits manually or test your connection anytime

## Installation

### Chrome/Edge (Chromium-based browsers)

1. **Download or Clone this repository**
   ```bash
   git clone https://github.com/your-username/Leet-git-streak.git
   cd Leet-git-streak
   ```

2. **Load the extension**
   - Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `Leet-git-streak` folder

3. **Create Extension Icons** (Required)
   - The extension needs icon files at `icons/icon16.png`, `icons/icon48.png`, and `icons/icon128.png`
   - You can create simple icons or use an online icon generator
   - Minimum sizes: 16x16, 48x48, 128x128 pixels

## Setup

### 1. Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Leet-Git Streak"
4. Select the `repo` scope (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### 2. Create a GitHub Repository

Create a new repository (or use an existing one) where you want to track your LeetCode streaks. For example:
- Repository name: `leetcode-streak`
- Make it public or private (your choice)

### 3. Configure the Extension

1. Click the extension icon in your browser toolbar
2. Fill in the configuration:
   - **GitHub Token**: Paste your personal access token
   - **Repository Owner**: Your GitHub username
   - **Repository Name**: The repository name (e.g., `leetcode-streak`)
   - **Branch**: Usually `main` or `master`
   - **File Path**: Path to the file that will track streaks (e.g., `leetcode-streak.md`)
3. Click "Save Configuration"
4. Click "Test Connection" to verify everything works

## How It Works

1. **Detection**: When you visit LeetCode and solve problems, the extension detects your activity
2. **Daily Check**: The extension checks once per day if you've been active on LeetCode
3. **Auto-Commit**: If activity is detected and you haven't committed today, it automatically creates a GitHub commit
4. **Streak Maintenance**: The commit updates a markdown file in your repository, maintaining your GitHub contribution streak

## Usage

### Automatic Mode (Recommended)

1. Just use LeetCode normally - solve problems, check your profile, etc.
2. The extension automatically detects activity and creates commits
3. Check the extension popup to see status and last commit date

### Manual Mode

1. Click the extension icon
2. Click "Create Commit Now" to manually create a commit
3. Useful if you want to commit outside of LeetCode activity

## File Format

The extension creates/updates a markdown file in your repository with entries like:

```markdown
## 2024-01-15

- **Time**: 2024-01-15T10:30:00.000Z
- **Streak**: 42
- **Activity**: LeetCode problem solved

---

## 2024-01-14

- **Time**: 2024-01-14T09:15:00.000Z
- **Streak**: 41
- **Activity**: LeetCode problem solved

---
```

## Troubleshooting

### Extension not detecting LeetCode activity

- Make sure you're on `leetcode.com` domain
- Refresh the LeetCode page after installing the extension
- Check browser console for any errors (F12 > Console)

### GitHub commits not being created

- Verify your GitHub token has `repo` permissions
- Test the connection using the "Test Connection" button
- Check that the repository exists and you have write access
- Verify the branch name is correct (usually `main` or `master`)

### "Already committed today" message

- The extension only creates one commit per day to maintain your streak
- If you need multiple commits, you can manually trigger them or modify the extension code

## Privacy & Security

- Your GitHub token is stored locally in your browser's sync storage
- The extension only accesses:
  - LeetCode.com (to detect activity)
  - GitHub API (to create commits)
- No data is sent to any third-party servers
- All processing happens locally in your browser

## Permissions Explained

- **Storage**: To save your configuration and track commit dates
- **Active Tab**: To detect LeetCode activity on the current page
- **Scripting**: To inject content scripts on LeetCode pages
- **Host Permissions**: 
  - `leetcode.com/*`: To monitor LeetCode activity
  - `api.github.com/*`: To create GitHub commits

## Development

### Project Structure

```
Leet-git-streak/
├── manifest.json       # Extension manifest
├── background.js       # Service worker for GitHub API
├── content.js         # Content script for LeetCode detection
├── popup.html         # Extension popup UI
├── popup.css          # Popup styles
├── popup.js           # Popup logic
├── icons/             # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── package.json       # Project metadata
└── README.md          # This file
```

### Making Changes

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## License

MIT License - feel free to use and modify as needed!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Disclaimer

This extension is for educational purposes. Use responsibly and in accordance with GitHub's Terms of Service. Maintaining streaks through automated commits is generally acceptable, but make sure you're actually solving problems on LeetCode!

---

**Happy Coding! 🔥**
