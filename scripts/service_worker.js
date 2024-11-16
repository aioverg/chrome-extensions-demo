let rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: '127.0.0.1' },
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};

chrome.declarativeContent.onPageChanged.removeRules(undefined, data => {
  chrome.declarativeContent.onPageChanged.addRules([rule1], data => {
    console.log('addRules', data);
  });
});