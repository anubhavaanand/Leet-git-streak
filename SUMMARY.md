# Project Summary: LeetCode to GitHub Streak Extension

## Overview
A Chrome browser extension that automatically transfers LeetCode daily activity into GitHub commits, helping developers maintain their GitHub contribution streak while solving coding problems.

## Architecture

### Extension Type
- **Manifest Version:** 3 (latest Chrome Extension standard)
- **Type:** Browser Extension (Chrome/Chromium-based browsers)

### Components

1. **manifest.json**
   - Extension configuration and permissions
   - Defines content scripts, background worker, and popup

2. **popup.html + popup.js**
   - User interface for configuration
   - Beautiful gradient design with purple theme
   - Configuration management for GitHub credentials

3. **background.js**
   - Service worker (Manifest V3 requirement)
   - GitHub API integration (GitHubAPI class)
   - Handles commit creation and repository management
   - Periodic activity checks (every 3 hours)

4. **content.js**
   - Runs on LeetCode pages
   - Monitors for solved problems
   - Extracts streak information
   - Communicates with background worker

## Key Features

### Automation
- Automatic detection of LeetCode activity
- Automatic GitHub commit creation (once per day)
- Automatic repository creation if needed
- Background checks every 3 hours

### Security
- Secure token storage in Chrome sync storage
- Bearer token authentication for GitHub API
- Proper URL validation to prevent spoofing
- No data sent to third-party servers

### User Experience
- Beautiful gradient UI (purple theme)
- Real-time status updates
- Browser notifications for sync confirmations
- Statistics tracking (streak count, days synced)

## Technical Details

### APIs Used
- Chrome Extension APIs: storage, alarms, notifications, tabs
- GitHub REST API v3

### Key Patterns
- **Authentication:** Bearer token format for GitHub API
- **Encoding:** UTF-8 support via btoa(unescape(encodeURIComponent()))
- **URL Validation:** URL object parsing for security
- **DOM Traversal:** querySelector for performance

### Permissions Required
- `storage`: Configuration persistence
- `alarms`: Periodic background checks
- `notifications`: User notifications
- Host permissions: leetcode.com, api.github.com

## File Structure

```
.
├── manifest.json           # Extension configuration
├── popup.html              # UI interface
├── popup.js                # UI logic
├── background.js           # Service worker & GitHub API
├── content.js              # LeetCode page monitoring
├── icons/                  # Extension icons (16, 48, 128)
├── README.md               # Main documentation
├── INSTALLATION.md         # Setup guide
├── FAQ.md                  # Common questions
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # MIT License
└── examples/               # Example outputs
    ├── README.md
    ├── SCREENSHOTS.html
    └── streak/
        └── 2025-01-15.md
```

## Generated GitHub Repository Structure

When users configure the extension, it creates:

```
{username}/leetcode-streak/
├── README.md               # Auto-generated description
└── streak/                 # Daily activity files
    ├── 2025-01-15.md
    ├── 2025-01-16.md
    └── ...
```

Each daily file contains:
- Date and timestamp
- Problem name (if detected)
- Automated commit message

## Security Considerations

### Implemented Protections
✅ Bearer token authentication (modern GitHub API)
✅ UTF-8 encoding for special characters
✅ Proper URL hostname validation
✅ Secure storage using Chrome sync
✅ CodeQL security scan passed (0 alerts)

### Best Practices Followed
- No hardcoded credentials
- No third-party data transmission
- Minimal permissions requested
- Proper error handling
- Secure URL parsing

## Quality Assurance

### Validations Performed
✅ JavaScript syntax validation (Node.js)
✅ JSON validation (manifest.json)
✅ Code review completed
✅ Security scan (CodeQL) - 0 alerts
✅ Chrome Extension Manifest V3 compliance

### Testing Checklist
- Extension loads without errors
- Popup UI displays correctly
- Configuration can be saved
- GitHub API integration works
- Content script runs on LeetCode
- Notifications appear
- No console errors

## Usage Flow

1. **Installation:** User loads unpacked extension in Chrome
2. **Configuration:** User enters GitHub token, username, and repo name
3. **Activity Detection:** Content script monitors LeetCode for solved problems
4. **Synchronization:** Background worker creates GitHub commit
5. **Notification:** User receives confirmation
6. **Result:** GitHub contribution graph shows activity

## Future Enhancement Ideas

- Firefox support (WebExtensions API)
- Custom commit messages
- Multiple repository support
- Statistics dashboard
- Dark mode
- Historical data sync
- Streak visualization
- Problem difficulty tracking

## Browser Compatibility

### Supported
- ✅ Chrome
- ✅ Edge
- ✅ Brave
- ✅ Opera
- ✅ Vivaldi
- ✅ Any Chromium-based browser

### Planned
- ⏳ Firefox (requires WebExtensions manifest modifications)
- ⏳ Safari (requires different extension format)

## License
MIT License - Open source and free to use

## Links
- Repository: https://github.com/anubhavaanand/Leet-git-streak
- Issues: https://github.com/anubhavaanand/Leet-git-streak/issues

## Credits
Built with Chrome Extension Manifest V3 and GitHub REST API v3
