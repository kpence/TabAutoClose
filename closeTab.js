function checkAndCloseTab(tabId, changeInfo, tab) {
  console.log("checkAndCloseTab");
  browser.storage.local.get("title_regex").then(checkRegex);

  function checkRegex(result) {
    console.log(result);
    var patt = new RegExp(result.title_regex);
    if (result.title_regex && result.title_regex.length > 0 && tab && patt.test(tab.title)) {
      setTimeout(function(){ chrome.tabs.remove(tabId); }, 300);
    }
  }
}

// listen to tab URL changes
chrome.tabs.onUpdated.addListener(checkAndCloseTab);

// update when the extension loads initially
checkAndCloseTab();
