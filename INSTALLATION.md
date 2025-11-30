# Installation Guide

## Quick Start

### Step 1: Prepare Icons

The extension requires icon files. You have two options:

**Option A: Use the helper script (if ImageMagick is installed)**
```bash
./create-icons.sh
```

**Option B: Create icons manually**
- Create three PNG images: 16x16, 48x48, and 128x128 pixels
- Place them in the `icons/` directory as:
  - `icons/icon16.png`
  - `icons/icon48.png`
  - `icons/icon128.png`
- You can use any image editor or online tools like [Favicon Generator](https://favicon.io/)

### Step 2: Load Extension in Chrome/Edge

1. Open Chrome or Edge browser
2. Navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select the `Leet-git-streak` folder
6. The extension should now appear in your extensions list

### Step 3: Pin the Extension (Optional)

1. Click the puzzle piece icon in your browser toolbar
2. Find "Leet-Git Streak" in the list
3. Click the pin icon to keep it visible in your toolbar

### Step 4: Configure the Extension

1. Click the extension icon in your toolbar
2. Follow the setup instructions in the popup:
   - Create a GitHub Personal Access Token
   - Enter your repository details
   - Save configuration
   - Test connection

## Creating a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a descriptive name: `Leet-Git Streak Extension`
4. Select expiration (or "No expiration" for convenience)
5. Check the **`repo`** scope (this gives full control of private repositories)
6. Click **"Generate token"**
7. **Copy the token immediately** - you won't be able to see it again!

## Setting Up Your Repository

1. Create a new repository on GitHub (or use an existing one)
   - Example name: `leetcode-streak`
   - Can be public or private
2. Note down:
   - Your GitHub username (repository owner)
   - Repository name
   - Default branch (usually `main` or `master`)

## Verification

After setup, verify everything works:

1. Open the extension popup
2. Click **"Test Connection"** - should show success message
3. Visit LeetCode and solve a problem (or just browse)
4. Click **"Create Commit Now"** to test manual commit
5. Check your GitHub repository - you should see a new commit and file

## Troubleshooting

### Extension icon is missing or broken
- Make sure all three icon files exist in the `icons/` directory
- Icons must be PNG format
- Check file names are exactly: `icon16.png`, `icon48.png`, `icon128.png`

### "Configuration incomplete" error
- Make sure all fields are filled in the popup
- GitHub token must have `repo` scope
- Repository owner and name must match exactly (case-sensitive)

### Connection test fails
- Verify your GitHub token is valid and not expired
- Check that the repository exists and you have access
- Ensure the branch name is correct (check in your repository settings)

### Commits not being created automatically
- Make sure you're on `leetcode.com` when solving problems
- The extension only creates one commit per day
- Check browser console (F12) for any errors
- Try manual commit to test if it's a detection issue

## Next Steps

Once installed and configured:
- The extension will automatically detect LeetCode activity
- It creates one commit per day when you're active
- Check the popup regularly to see status and last commit date
- Your GitHub contribution graph will show consistent activity!

