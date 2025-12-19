# 🌐 GitHub Pages Setup Instructions

Follow these steps to enable GitHub Pages for your Leet-Git Streak project:

## Step-by-Step Guide

### 1. Go to GitHub Pages Settings

Open this URL in your browser:
```
https://github.com/anubhavaanand/Leet-git-streak/settings/pages
```

Or navigate manually:
1. Go to your repository: `https://github.com/anubhavaanand/Leet-git-streak`
2. Click **Settings** tab (top right)
3. Click **Pages** in the left sidebar

### 2. Configure GitHub Pages

Under **"Build and deployment"** section:

1. **Source**: Select **"Deploy from a branch"**
2. **Branch**: 
   - Select **`main`** from the dropdown
   - Select **`/ (root)`** for the folder
3. Click **Save**

### 3. Wait for Deployment

- GitHub will show a message: "Your site is being built from the main branch"
- Wait 2-3 minutes for the deployment to complete
- Refresh the page to see the deployment status

### 4. Verify Your Site is Live

Once deployed, you'll see a message like:
```
✅ Your site is live at https://anubhavaanand.github.io/Leet-git-streak/
```

Click the link to view your landing page!

## What You'll See

Your GitHub Pages site will display:
- 🔥 Beautiful landing page
- 📦 Installation instructions
- ✨ Feature highlights
- 📚 Documentation links
- 🎯 Quick setup guide

## GitHub Actions Workflow

The project includes a GitHub Actions workflow (`.github/workflows/pages.yml`) that will automatically deploy updates whenever you push to the `main` branch.

You can check the workflow status:
1. Go to your repository
2. Click the **Actions** tab
3. You should see deployment runs

## Troubleshooting

### "GitHub Pages is currently disabled"
- Make sure you're on the correct repository
- Ensure you have admin access to the repository

### "404 - There isn't a GitHub Pages site here"
- Wait a few more minutes (first deployment can take up to 5 minutes)
- Check that the branch is set to `main` and folder to `/ (root)`
- Verify the GitHub Actions workflow completed successfully

### Site not updating after changes
- Check the Actions tab for failed deployments
- Make sure you pushed your changes to the `main` branch
- Clear your browser cache and refresh

## Testing Your Site

Once live, test these pages:
- Main landing page: `https://anubhavaanand.github.io/Leet-git-streak/`
- README: `https://anubhavaanand.github.io/Leet-git-streak/README.md`
- Installation Guide: `https://anubhavaanand.github.io/Leet-git-streak/INSTALLATION.md`

---

**All set! Your project now has a professional landing page! 🎉**
