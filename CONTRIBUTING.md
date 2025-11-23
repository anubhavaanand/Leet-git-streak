# Contributing to LeetCode to GitHub Streak

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser version and OS
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:
- Clear description of the feature
- Use case and benefits
- Any implementation ideas

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites
- Chrome or Chromium-based browser
- Text editor (VS Code recommended)
- Basic knowledge of JavaScript and Chrome Extension APIs

### Testing Your Changes

1. Load the extension as unpacked in Chrome
2. Make your code changes
3. Go to `chrome://extensions/`
4. Click the refresh icon on the extension
5. Test the functionality
6. Check browser console for errors

### Debugging

#### Popup Debugging
- Right-click extension icon → Inspect popup
- Console shows popup.js logs

#### Background Worker Debugging
- Go to `chrome://extensions/`
- Find extension → "Inspect views: service worker"
- Console shows background.js logs

#### Content Script Debugging
- Open LeetCode page
- Open browser DevTools (F12)
- Console shows content.js logs

## Code Style

- Use ES6+ features
- Use async/await for asynchronous code
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

## Testing Checklist

Before submitting a PR, ensure:
- [ ] Extension loads without errors
- [ ] Popup UI displays correctly
- [ ] Configuration can be saved
- [ ] GitHub API integration works
- [ ] Content script detects LeetCode activity
- [ ] Notifications appear correctly
- [ ] No console errors
- [ ] Code follows existing style

## Areas for Contribution

### High Priority
- Improve LeetCode streak detection accuracy
- Add support for more browsers (Firefox, Safari)
- Enhance error handling and user feedback
- Add unit tests

### Medium Priority
- Add dark mode support
- Improve icon design
- Add statistics dashboard
- Support multiple repositories

### Low Priority
- Add localization (i18n)
- Custom commit messages
- Streak visualization

## Questions?

Feel free to open an issue for any questions about contributing!

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help create a welcoming community

Thank you for contributing! 🎉
