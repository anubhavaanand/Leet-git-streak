# 🤝 Contributing to Leet-Git Streak

Thank you for your interest in contributing to **Leet-Git Streak**! We welcome contributions from the community.

## Ways to Contribute

There are many ways you can contribute to this project:

- 🐛 **Report bugs** - Found a bug? Let us know!
- ✨ **Suggest features** - Have an idea? We'd love to hear it!
- 📝 **Improve documentation** - Help make our docs better
- 💻 **Submit code** - Fix bugs or implement new features
- 🧪 **Test the extension** - Help us ensure quality
- ⭐ **Star the repo** - Show your support!

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/Leet-git-streak.git
cd Leet-git-streak
```

### 2. Load the Extension

1. Open Brave/Chrome/Edge
2. Go to `chrome://extensions/` (or `brave://extensions/`)
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `Leet-git-streak` folder

### 3. Make Your Changes

- Edit the relevant files
- Test your changes thoroughly
- Follow the coding style of the project

### 4. Test Your Changes

- Reload the extension in the browser
- Run through the [Testing Guide](TESTING_GUIDE.md)
- Verify no new errors appear in the console

### 5. Submit a Pull Request

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Commit your changes
git add .
git commit -m "Add: brief description of your changes"

# Push to your fork
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub!

## Code Style Guidelines

### JavaScript

- Use **camelCase** for variables and functions
- Use **const** for values that don't change
- Use **let** for values that change
- Add comments for complex logic
- Keep functions small and focused

**Example:**
```javascript
// Good
const userName = 'John';
function getUserData() {
  // Implementation
}

// Avoid
var user_name = 'John';
function get_user_data() {
  // Implementation
}
```

### HTML/CSS

- Use semantic HTML elements
- Keep CSS organized and well-commented
- Use consistent indentation (2 spaces)
- Follow existing naming conventions

### Commit Messages

Use clear, descriptive commit messages:

- `Add: new feature description`
- `Fix: bug description`
- `Update: what was updated`
- `Docs: documentation changes`
- `Refactor: code improvement without functionality change`

## Project Structure

```
Leet-git-streak/
├── manifest.json        # Extension configuration
├── background.js        # Service worker (GitHub API)
├── content.js          # LeetCode detection
├── popup.html          # Extension UI structure
├── popup.css           # Extension UI styles
├── popup.js            # Extension UI logic
├── icons/              # Extension icons
├── screenshots/        # Documentation images
└── docs/               # Documentation files
```

## Feature Suggestions

Before implementing a new feature, please:

1. **Check existing issues** - Someone might have already suggested it
2. **Open a discussion** - Create an issue to discuss the feature
3. **Wait for feedback** - Let maintainers weigh in
4. **Then implement** - Once approved, go ahead!

## Bug Reports

When reporting bugs, please include:

- **Browser and version** (e.g., Brave 1.50.114)
- **Operating system** (e.g., Ubuntu 22.04)
- **Steps to reproduce** the bug
- **Expected behavior** vs **actual behavior**
- **Screenshots** (if applicable)
- **Console errors** (if any)

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Changes have been tested in Brave/Chrome/Edge
- [ ] No console errors or warnings
- [ ] Documentation updated (if needed)
- [ ] Screenshots added (for UI changes)

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
How did you test these changes?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code tested locally
- [ ] No console errors
- [ ] Documentation updated
```

## Development Tips

### Debugging

1. **Service Worker Console:**
   - Go to `chrome://extensions/`
   - Click "service worker" under Leet-Git Streak
   - View background.js logs and errors

2. **Content Script Console:**
   - Open LeetCode in a new tab
   - Press F12 → Console
   - Check for content.js messages

3. **Popup Console:**
   - Right-click the extension icon
   - Select "Inspect popup"
   - Check for popup.js errors

### Reloading Changes

After making changes:
1. Go to `chrome://extensions/`
2. Click the reload icon on the Leet-Git Streak card
3. Test your changes

## Future Feature Ideas

Here are some ideas for future contributions:

- [ ] **Firefox Support** - Adapt for Firefox WebExtensions
- [ ] **Custom Commit Messages** - Let users customize commit messages
- [ ] **Statistics Dashboard** - Show streaks, total commits, etc.
- [ ] **Multiple Repository Support** - Track to multiple repos
- [ ] **Notification System** - Desktop notifications for commits
- [ ] **Dark Mode** - Dark theme for the popup
- [ ] **Export Data** - Export activity history
- [ ] **Other Platforms** - Support HackerRank, Codeforces, etc.

## Code of Conduct

Please be respectful and constructive:

- Be welcoming to newcomers
- Respect differing viewpoints
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

## Questions?

If you have questions:

- **Open an issue** for general questions
- **Check existing issues** - your question might be answered
- **Read the docs** - especially [README.md](README.md) and [INSTALLATION.md](INSTALLATION.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🎉**

Your contributions help make Leet-Git Streak better for everyone!
