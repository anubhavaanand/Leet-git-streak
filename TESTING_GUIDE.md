# 🧪 Testing Guide

This guide will help you verify that the **Leet-Git Streak** extension is working correctly.

## Prerequisites

Before testing, make sure you have:
- ✅ Installed the extension in Brave/Chrome/Edge
- ✅ Completed the setup wizard with a valid GitHub token
- ✅ Access to a GitHub repository for testing

## Testing Checklist

### 1. Extension Installation Test

**Verify the extension is loaded:**

1. Open your browser's extensions page:
   - Brave: `brave://extensions/`
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

2. Look for **"Leet-Git Streak"** in the list
3. Verify it shows:
   - ✅ Extension icon (fire emoji 🔥)
   - ✅ Name: "Leet-Git Streak"
   - ✅ Version: 1.0.0
   - ✅ Status: "Enabled"
   - ✅ No errors in the card

**Expected Result:** Extension appears and is enabled without errors.

---

### 2. Setup Wizard Test

**Test the initial configuration:**

1. Click the extension icon in your browser toolbar
2. If this is your first time, you should see the **3-step setup wizard**
3. Go through each step:

**Step 1 - GitHub Token:**
- Click "Open GitHub Token Settings" (should open GitHub in a new tab)
- Create a token with `repo` scope
- Paste the token and click "Verify Token"
- ✅ Should show "Token verified!" message
- ✅ Should auto-detect your GitHub username

**Step 2 - Repository Setup:**
- Username should be pre-filled
- Enter a repository name (e.g., `leetcode-streak-test`)
- Click "Next"
- ✅ Should proceed to Step 3

**Step 3 - Final Configuration:**
- Branch should be pre-filled with "main"
- File path should be pre-filled with "leetcode-streak.md"
- Click "Finish Setup"
- ✅ Should show the main dashboard

**Expected Result:** Setup wizard completes successfully and shows the dashboard.

---

### 3. Connection Test

**Verify GitHub API connection:**

1. On the dashboard, look for the **"Quick Actions"** section
2. Click **"Test Connection"** button
3. Wait for the response

**Expected Results:**
- ✅ Shows "Testing..." status
- ✅ Shows "Connection successful!" message
- ✅ No error messages

**If you get an error:**
- ❌ "Authentication failed" → Check your GitHub token
- ❌ "Repository not found" → Verify repository name and access
- ❌ "Network error" → Check your internet connection

---

### 4. Manual Commit Test

**Create a test commit:**

1. On the dashboard, click **"🚀 Create Commit Now"**
2. Wait for the operation to complete

**Expected Results:**
- ✅ Shows "Creating commit..." status
- ✅ Shows success message with commit details
- ✅ "Last Commit" section updates with today's date

**Verify on GitHub:**
1. Go to your repository: `https://github.com/[your-username]/[repo-name]`
2. Check if:
   - ✅ New commit appears in the commit history
   - ✅ File `leetcode-streak.md` exists (or your custom path)
   - ✅ File contains today's date and activity entry

---

### 5. LeetCode Detection Test

**Test automatic activity detection:**

1. Open [LeetCode.com](https://leetcode.com/) in a new tab
2. Log in to your LeetCode account
3. Visit any problem page or your profile
4. Open the browser console (F12 → Console)
5. Look for extension messages

**Expected Results:**
- ✅ Console shows: "Leet-Git Streak: Content script loaded"
- ✅ No JavaScript errors related to the extension

**Note:** The extension detects activity in the background, so you might not see immediate visual feedback.

---

### 6. Duplicate Commit Prevention Test

**Verify one-commit-per-day limit:**

1. Create a manual commit (button in dashboard)
2. Wait for success confirmation
3. Try to create another commit immediately
4. Check the response

**Expected Results:**
- ✅ First commit succeeds
- ✅ Second attempt shows: "Already committed today!"
- ✅ Prevents spam commits

---

### 7. Settings Update Test

**Test configuration changes:**

1. On the dashboard, click **"⚙️ Edit Settings"** (at the bottom)
2. You should see the configuration form
3. Try changing the file path (e.g., to `activity/streak.md`)
4. Click **"Save Configuration"**
5. Click **"Test Connection"** again

**Expected Results:**
- ✅ Settings save successfully
- ✅ Connection test works with new settings
- ✅ Next commit uses the new file path

---

### 8. Status Tracking Test

**Verify status information updates:**

1. After creating a commit, check the dashboard shows:
   - ✅ **Connection Status:** "Connected to GitHub" (green)
   - ✅ **Last Commit:** Today's date
   - ✅ **Repository Info:** Your username/repo-name

2. Close and reopen the extension popup
3. Verify:
   - ✅ All information persists
   - ✅ Last commit date is still shown

---

## Common Issues and Solutions

### ❌ "Invalid GitHub token"
**Solution:**
- Verify token has `repo` scope
- Generate a new token if the old one expired
- Re-run the setup wizard

### ❌ "Repository not found"
**Solution:**
- Check repository name spelling
- Verify you have access to the repository
- Try making the repository public (or use a token with correct permissions)
- Use the "Auto Repository Creation" feature

### ❌ Extension icon not showing
**Solution:**
- Check if extension is enabled
- Reload the extension
- Restart your browser

### ❌ "Already committed today" when you haven't
**Solution:**
- Check if commits were created earlier
- Clear extension storage: Right-click extension icon → Manage Extension → Storage → Clear
- Reload the extension

### ❌ LeetCode activity not detected
**Solution:**
- Refresh the LeetCode page
- Check browser console for errors
- Verify the extension has permission for leetcode.com

---

## Manual Testing Script

Run through this quick checklist:

```
[ ] Extension installed and enabled
[ ] Setup wizard completed
[ ] Token verified successfully
[ ] Connection test passed
[ ] Manual commit created
[ ] Commit visible on GitHub
[ ] Second commit blocked (same day)
[ ] Settings can be updated
[ ] Status information persists
[ ] LeetCode detection works
```

---

## Automated Testing (for Developers)

If you want to run automated tests:

```bash
# Install dependencies
npm install

# Future: Add test commands here
# npm test
```

> **Note:** Automated tests are planned for future releases.

---

## Reporting Issues

If you find any issues during testing:

1. **Check the browser console** (F12 → Console) for error messages
2. **Check the extension's service worker console:**
   - Go to `chrome://extensions/`
   - Find "Leet-Git Streak"
   - Click "service worker" link
   - Check for errors

3. **Report on GitHub:**
   - Go to: https://github.com/anubhavaanand/Leet-git-streak/issues
   - Create a new issue with:
     - Steps to reproduce
     - Expected vs actual behavior
     - Browser version
     - Error messages (if any)

---

## Success Criteria

✅ Your extension is working correctly if:
- Setup wizard completes without errors
- Connection test passes
- Manual commits appear on GitHub
- Status information updates correctly
- No errors in browser console

---

**Happy Testing! 🎉**

Once all tests pass, you're ready to use the extension daily to maintain your GitHub streak!
