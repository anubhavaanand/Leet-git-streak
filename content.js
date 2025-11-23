// content.js - Content script that runs on LeetCode pages

// Function to extract LeetCode streak information
function extractLeetCodeStreak() {
  try {
    // LeetCode displays streak information on the profile and problems page
    // We'll look for the streak counter in the user's submission calendar
    
    // Try to find streak in the calendar/profile
    const streakElements = document.querySelectorAll('[class*="streak"], [class*="calendar"]');
    
    // Try to find the current streak number
    let streakValue = null;
    
    // Method 1: Look for streak text
    const textNodes = document.evaluate(
      "//text()[contains(., 'day streak') or contains(., 'Day Streak') or contains(., 'Current Streak')]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    
    let node = textNodes.iterateNext();
    while (node) {
      const text = node.textContent;
      const match = text.match(/(\d+)\s*day/i);
      if (match) {
        streakValue = parseInt(match[1]);
        break;
      }
      node = textNodes.iterateNext();
    }
    
    // Method 2: Check for submission today
    const today = new Date().toISOString().split('T')[0];
    const submissions = document.querySelectorAll('[data-date], [data-level]');
    let hasSubmissionToday = false;
    
    submissions.forEach(element => {
      const date = element.getAttribute('data-date');
      if (date === today && element.getAttribute('data-level') > 0) {
        hasSubmissionToday = true;
      }
    });
    
    return {
      streak: streakValue,
      hasSubmissionToday: hasSubmissionToday,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error extracting LeetCode streak:', error);
    return null;
  }
}

// Function to check if user solved a problem
function checkProblemSolved() {
  try {
    // Look for success indicators on the problem page
    const successIndicators = [
      document.querySelector('[data-e2e-locator="submission-result"]'),
      document.querySelector('.success'),
      document.querySelector('[class*="accepted"]')
    ];
    
    for (const indicator of successIndicators) {
      if (indicator && indicator.textContent.toLowerCase().includes('accepted')) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking problem solved:', error);
    return false;
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStreakData') {
    const streakData = extractLeetCodeStreak();
    sendResponse(streakData);
  } else if (request.action === 'checkProblemSolved') {
    const solved = checkProblemSolved();
    sendResponse({ solved: solved });
  }
  return true; // Keep the message channel open for async response
});

// Observer to detect when problems are solved
const observer = new MutationObserver((mutations) => {
  if (checkProblemSolved()) {
    chrome.runtime.sendMessage({
      action: 'problemSolved',
      timestamp: new Date().toISOString()
    });
  }
});

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial check and send streak data
setTimeout(() => {
  const streakData = extractLeetCodeStreak();
  if (streakData) {
    chrome.runtime.sendMessage({
      action: 'streakUpdate',
      data: streakData
    });
  }
}, 2000); // Wait 2 seconds for page to load
