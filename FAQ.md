# Frequently Asked Questions (FAQ)

## General Questions

### What is this extension?
This is a browser extension that automatically creates commits on GitHub when you solve problems on LeetCode, helping you maintain your GitHub contribution streak.

### Is it free?
Yes! This extension is completely free and open source under the MIT License.

### Which browsers are supported?
Currently supports Chrome and all Chromium-based browsers (Edge, Brave, Opera, Vivaldi, etc.). Firefox support is planned.

## Setup Questions

### How do I get a GitHub token?
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name and select the `repo` scope
4. Copy the generated token

### What permissions does the token need?
The token needs the `repo` scope to create repositories and commits.

### Can I use an existing repository?
Yes! Just enter the repository name in the configuration. The extension will use it if it exists.

### Will it create a new repository?
If the repository doesn't exist, the extension will create it automatically.

### Is my token safe?
Yes! Your token is stored securely in Chrome's sync storage and never sent to any third-party servers. Only your browser communicates directly with GitHub.

## Usage Questions

### How often does it sync?
The extension syncs once per day when it detects LeetCode activity. This prevents duplicate commits.

### When does it create commits?
When you solve a problem on LeetCode and the extension detects the activity.

### What if I solve multiple problems in one day?
Currently, the extension creates one commit per day to maintain a clean GitHub contribution graph. Multiple problems on the same day will be counted as one daily activity.

### Can I customize the commit message?
Not yet, but this feature is planned for future releases!

### Where are the commits created?
Commits are created in the `streak/` directory of your repository, with one markdown file per day.

## Troubleshooting

### The extension isn't detecting my LeetCode activity
- Make sure you're logged into LeetCode
- Refresh the LeetCode page after installing the extension
- Check if you're on leetcode.com (not a subdomain like leetcode.cn)
- Check browser console for errors

### I'm not seeing commits in my GitHub repository
- Verify your GitHub token has the correct permissions
- Check that the repository name is correct
- Look for error notifications from the extension
- Check the background worker console for errors

### The popup shows "Status: Not Configured"
Make sure you've entered all three fields:
- GitHub token
- GitHub username
- Repository name

### I get an API error
- Check if your GitHub token is still valid (it may have expired)
- Verify the token has `repo` permissions
- Try generating a new token

### The extension shows as inactive
- The extension only becomes active after you've configured it
- Save your configuration by clicking "Save Configuration"
- Check that all fields are filled in correctly

## Privacy & Security

### What data does the extension collect?
The extension doesn't collect any personal data. It only:
- Detects when you solve problems on LeetCode
- Creates commits using the GitHub API
- Stores configuration locally in your browser

### Where is my data stored?
All data is stored locally in Chrome's sync storage. Nothing is sent to external servers.

### Can others see my activity?
Only if your GitHub repository is public. You can make it private in the repository settings.

### Can I revoke access?
Yes! You can revoke the GitHub token anytime at https://github.com/settings/tokens

## Features

### Can it sync past activity?
Not currently. The extension only tracks new activity going forward.

### Does it work with LeetCode Premium?
Yes! The extension works regardless of your LeetCode subscription status.

### Can I use multiple GitHub accounts?
Not currently. You can only configure one GitHub account per browser profile.

### Can I sync to multiple repositories?
Not currently. Each configuration supports one repository.

## Technical Questions

### What technology is it built with?
- Chrome Extension Manifest V3
- Vanilla JavaScript (no frameworks)
- GitHub REST API v3

### Can I contribute to the project?
Yes! Check out CONTRIBUTING.md for guidelines.

### Is the source code available?
Yes! The project is open source on GitHub: https://github.com/anubhavaanand/Leet-git-streak

### How can I report bugs?
Open an issue on GitHub with details about the bug and steps to reproduce.

## Planned Features

- Firefox support
- Custom commit messages
- Statistics dashboard
- Multiple repository support
- Dark mode
- Streak visualization
- Historical data sync

## Still Have Questions?

Open an issue on GitHub: https://github.com/anubhavaanand/Leet-git-streak/issues
