# 🧪 Quick Test Instructions

Follow these steps to test your **Leet-Git Streak** extension in Brave:

## 1. Load Extension in Brave

### Open Brave Extensions Page
```bash
# If Brave is not running, start it:
brave-browser &

# Or open manually and type in address bar:
brave://extensions/
```

### Enable Developer Mode
1. Look for the **"Developer mode"** toggle in the top-right corner
2. Click it to **enable** Developer mode

### Load the Extension
1. Click the **"Load unpacked"** button
2. Navigate to: `/home/anubhavanand/Downloads/code/Leet-git-streak`
3. Click **"Select"**
4. The extension should now appear in your extensions list! ✅

## 2. Verify Installation

Check that the extension shows:
- ✅ **Name**: Leet-Git Streak
- ✅ **Version**: 1.0.0
- ✅ **Status**: Enabled (blue toggle switch)
- ✅ **Icon**: Fire emoji 🔥
- ✅ **No errors** in the extension card

## 3. Test the Extension

### Open the Popup
1. Look for the extension icon in your browser toolbar (top-right)
2. If you don't see it, click the **puzzle piece icon** and pin the extension
3. Click the **Leet-Git Streak icon** (🔥)

### Run Setup Wizard (First Time)
You should see a 3-step wizard:

**Step 1: GitHub Token**
1. Click "Open GitHub Token Settings" (opens GitHub in new tab)
2. Log in to GitHub if needed
3. Click "Generate new token (classic)"
4. Give it a name: `Leet-Git Streak Test`
5. Check the **`repo`** scope
6. Click "Generate token"
7. Copy the token
8. Paste it in the extension and click "Verify Token"
9. ✅ Should show "Token verified!" and auto-fill your username

**Step 2: Repository**
1. Your GitHub username should be pre-filled
2. Enter repository name: `leetcode-streak-test`
3. Click "Next"

**Step 3: Configuration**
1. Branch should be "main" (default)
2. File path should be "leetcode-streak.md" (default)
3. Click "Finish Setup"

### Test Connection
1. You should now see the dashboard
2. Click **"Test Connection"** button
3. ✅ Should show "Connection successful!"

### Create Test Commit
1. Click **"🚀 Create Commit Now"** button
2. Wait for the response
3. ✅ Should show success message with commit details

### Verify on GitHub
1. Go to: `https://github.com/YOUR-USERNAME/leetcode-streak-test`
2. Check that:
   - ✅ Repository was created
   - ✅ New commit appears
   - ✅ File `leetcode-streak.md` exists
   - ✅ File contains today's date

## 4. Test LeetCode Detection

1. Open a new tab and go to: `https://leetcode.com/`
2. Log in to your LeetCode account
3. Visit any problem or your profile
4. Press **F12** to open Developer Console
5. Go to the **Console** tab
6. Look for: `Leet-Git Streak: Content script loaded`
7. ✅ Should see the message without errors

## 5. Test Daily Limit

1. Go back to the extension popup
2. Try clicking **"Create Commit Now"** again
3. ✅ Should show: "Already committed today!"
4. This prevents spam commits!

## 6. Check Console for Errors

### Extension Service Worker
1. Go to: `brave://extensions/`
2. Find "Leet-Git Streak"
3. Click **"service worker"** link
4. Check for any **errors** in the console
5. ✅ Should be clean (no red errors)

### Content Script (on LeetCode)
1. Open: `https://leetcode.com/`
2. Press **F12** → **Console** tab
3. Check for extension-related messages
4. ✅ Should see initialization messages, no errors

## Test Results Summary

After completing all tests, you should have:

- [x] Extension loaded successfully
- [x] Setup wizard completed
- [x] GitHub token verified
- [x] Connection test passed
- [x] Test commit created
- [x] Commit visible on GitHub
- [x] Duplicate commit prevented
- [x] LeetCode detection working
- [x] No console errors

## If Everything Works ✅

**Congratulations!** Your extension is fully functional and ready to use daily!

### Next Steps:
1. Start solving LeetCode problems
2. The extension will automatically track your activity
3. Check your GitHub profile to see the green squares! 🟢

## If Something Fails ❌

Refer to the [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed troubleshooting steps.

Common issues:
- **Token invalid**: Generate a new token with `repo` scope
- **Repository not found**: Check repository name and permissions
- **Extension not loading**: Check for JavaScript errors in console
- **LeetCode not detected**: Refresh the LeetCode page

---

**Happy Testing! 🔥**

Your GitHub streak is about to get a lot greener! 🟢🟢🟢
