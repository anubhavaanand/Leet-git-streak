// Content script to detect LeetCode streak information
(function() {
  'use strict';

  let lastStreak = null;
  let checkInterval = null;

  // Function to extract streak information from LeetCode page
  function extractStreakInfo() {
    try {
      // Method 1: Check for streak in user profile or dashboard
      const streakElements = document.querySelectorAll('[class*="streak"], [class*="Streak"], [data-testid*="streak"]');
      
      // Method 2: Look for streak in common LeetCode UI patterns
      const possibleSelectors = [
        'div[class*="streak"]',
        'span[class*="streak"]',
        '[aria-label*="streak" i]',
        '[title*="streak" i]'
      ];

      let streakValue = null;
      
      for (const selector of possibleSelectors) {
        const elements = document.querySelectorAll(selector);
        for (const el of elements) {
          const text = el.textContent || el.innerText || '';
          const match = text.match(/(\d+)\s*(day|days?)\s*(streak|in a row)/i);
          if (match) {
            streakValue = parseInt(match[1]);
            break;
          }
        }
        if (streakValue) break;
      }

      // Method 3: Check if user has solved a problem today (indicates active streak)
      const solvedToday = document.querySelector('[class*="solved"], [class*="completed"], [data-status="solved"]');
      
      // Method 4: Check localStorage or sessionStorage for streak data
      try {
        const storageData = localStorage.getItem('streak') || sessionStorage.getItem('streak');
        if (storageData) {
          const parsed = JSON.parse(storageData);
          if (parsed.currentStreak) {
            streakValue = parsed.currentStreak;
          }
        }
      } catch (e) {
        // Ignore storage errors
      }

      return {
        streak: streakValue,
        hasActivity: !!solvedToday || streakValue !== null,
        timestamp: new Date().toISOString(),
        url: window.location.href
      };
    } catch (error) {
      console.error('Error extracting streak info:', error);
      return null;
    }
  }

  // Function to check for streak changes and notify background script
  function checkStreak() {
    const streakInfo = extractStreakInfo();
    
    if (streakInfo && streakInfo.hasActivity) {
      // Check if streak has changed or if it's a new day
      const today = new Date().toDateString();
      const lastCheck = localStorage.getItem('leetGitLastCheck');
      
      if (lastCheck !== today) {
        // New day detected, notify background script
        chrome.runtime.sendMessage({
          type: 'STREAK_DETECTED',
          data: streakInfo
        });
        
        localStorage.setItem('leetGitLastCheck', today);
        localStorage.setItem('leetGitLastStreak', JSON.stringify(streakInfo));
      }
    }
  }

  // Start monitoring when page loads
  function startMonitoring() {
    // Initial check
    checkStreak();
    
    // Check every 30 seconds
    if (checkInterval) {
      clearInterval(checkInterval);
    }
    
    checkInterval = setInterval(checkStreak, 30000);
    
    // Also check when user navigates (LeetCode is a SPA)
    const observer = new MutationObserver(() => {
      checkStreak();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Listen for messages from popup or background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_STREAK') {
      const streakInfo = extractStreakInfo();
      sendResponse(streakInfo);
    }
    return true;
  });

  // Start monitoring when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startMonitoring);
  } else {
    startMonitoring();
  }
})();

