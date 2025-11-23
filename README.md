# 🏆 LeetCode to GitHub Streak

Transfer your LeetCode streaks into GitHub commits effortlessly with this browser extension!

## 🎯 What is this?

This browser extension automatically syncs your LeetCode daily activity to a GitHub repository, helping you maintain your GitHub contribution streak even when you're grinding LeetCode problems. Every time you solve a problem on LeetCode, the extension creates a commit in your designated GitHub repository.

## ✨ Features

- 🔄 **Automatic Syncing**: Automatically detects LeetCode activity and creates GitHub commits
- 📊 **Streak Tracking**: Keeps track of your LeetCode streak and synced days
- 🎨 **Beautiful UI**: Clean, modern popup interface with gradient design
- 🔔 **Notifications**: Get notified when your activity is synced
- 🔒 **Secure**: Your GitHub token is stored securely in Chrome's sync storage
- 🚀 **Easy Setup**: Simple configuration - just add your GitHub token and repo details

## 📦 Installation

### Load as Unpacked Extension (Development)

1. Download or clone this repository
2. Open Chrome (or any Chromium-based browser like Edge, Brave, etc.)
3. Navigate to `chrome://extensions/`
4. Enable "Developer mode" (toggle in top-right corner)
5. Click "Load unpacked"
6. Select the directory containing this extension

### From Chrome Web Store (Coming Soon)

The extension will be published to the Chrome Web Store soon!

## 🚀 Setup

1. **Install the Extension** (see above)

2. **Create a GitHub Personal Access Token**
   - Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name like "LeetCode Streak Extension"
   - Select the following scopes:
     - `repo` (Full control of private repositories)
   - Click "Generate token"
   - **Copy the token** (you won't be able to see it again!)

3. **Configure the Extension**
   - Click the extension icon in your browser toolbar
   - Paste your GitHub token
   - Enter your GitHub username
   - Enter a repository name (e.g., `leetcode-streak`)
   - Click "Save Configuration"

4. **Start Solving Problems!**
   - Visit [LeetCode](https://leetcode.com)
   - Solve problems as usual
   - The extension will automatically sync your activity to GitHub

## 📖 How It Works

1. **Content Script**: Runs on LeetCode pages and monitors for solved problems
2. **Background Worker**: Handles GitHub API calls and creates commits
3. **Popup UI**: Provides configuration and status display

When you solve a problem on LeetCode, the extension:
- Detects the activity via content script
- Checks if a commit has already been made today
- Creates a markdown file in the `streak/` directory with today's date
- Commits the file to your GitHub repository
- Shows a success notification

## 📁 Repository Structure

```
.
├── manifest.json       # Extension manifest (Chrome Extension Manifest V3)
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic and configuration
├── background.js      # Background service worker (GitHub API integration)
├── content.js         # Content script for LeetCode pages
├── icons/             # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # This file
```

## 🔧 Technical Details

- **Manifest Version**: 3 (latest Chrome Extension standard)
- **Permissions**: 
  - `storage`: For saving configuration
  - `alarms`: For periodic checks
  - `notifications`: For user notifications
- **Host Permissions**: 
  - `leetcode.com`: To detect activity
  - `api.github.com`: To create commits
- **APIs Used**: GitHub REST API v3

## 🛠️ Development

### Prerequisites
- Node.js (optional, for development tools)
- A Chromium-based browser

### Local Testing
1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Code Structure
- `GitHubAPI` class: Handles all GitHub API interactions
- Content script: Monitors LeetCode pages using MutationObserver
- Background worker: Service worker that handles commits and scheduling

## 🔐 Security & Privacy

- Your GitHub token is stored securely in Chrome's sync storage
- The token is never sent to any third-party servers
- All communication is directly between your browser and GitHub API
- The extension only accesses LeetCode and GitHub domains

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by developers who want to maintain their GitHub streak while learning on LeetCode
- Built with Chrome Extension Manifest V3
- Uses GitHub REST API

## 📧 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the browser console for error messages
- Make sure your GitHub token has the correct permissions

## 🎉 Happy Coding!

Keep solving problems and watch your GitHub contribution graph light up! 🔥

---

**Note**: This extension is not affiliated with LeetCode or GitHub. It's an independent tool created to help developers maintain their coding streaks.
