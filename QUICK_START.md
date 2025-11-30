# 🚀 Quick Start Guide

## Step 1: Load the Extension

1. Open **Chrome** or **Edge** browser
2. Navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable **"Developer mode"** (toggle in top-right)
4. Click **"Load unpacked"**
5. Navigate to and select this folder: `/home/anubhavanand/Downloads/code/Leet-git-streak`
6. The extension should now appear in your extensions list!

## Step 2: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `Leet-Git Streak`
4. Select expiration (or "No expiration")
5. **Check the `repo` scope** (full control of repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN** - you won't see it again!

## Step 3: Create/Choose a GitHub Repository

Create a new repository (or use existing):
- Repository name: `leetcode-streak` (or any name you like)
- Can be public or private
- Note your GitHub username and repository name

## Step 4: Configure the Extension

1. Click the extension icon in your browser toolbar
2. Fill in:
   - **GitHub Token**: Paste your token
   - **Repository Owner**: Your GitHub username
   - **Repository Name**: Your repository name
   - **Branch**: `main` (or `master`)
   - **File Path**: `leetcode-streak.md`
3. Click **"Save Configuration"**
4. Click **"Test Connection"** - should show ✅ success!

## Step 5: Test It!

1. Visit **leetcode.com** and solve a problem (or just browse)
2. Click the extension icon
3. Click **"Create Commit Now"** to manually test
4. Check your GitHub repository - you should see a new commit!

## ✅ You're Done!

The extension will now automatically:
- Detect when you're active on LeetCode
- Create one GitHub commit per day
- Maintain your GitHub contribution streak

Check the extension popup anytime to see status and last commit date!

