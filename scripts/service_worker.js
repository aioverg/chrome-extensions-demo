
// 加载图片
async function loadImageData(url) {
  const img = await createImageBitmap(await (await fetch(url)).blob())
  const { width: w, height: h } = img; const canvas = new OffscreenCanvas(w, h)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, w, h)
  return ctx.getImageData(0, 0, w, h)
}

chrome.runtime.onInstalled.addListener(async () => {

  // chrome.action.disable(); // 禁用插件

  // 载入图片
  const png16 = await loadImageData("/icons/16.png")

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // 启用插件规则
    let enableRule = {
      id: 'enableRule',
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostSuffix: '.baidu.com', schemes: ['https'] },
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowAction(), // 在当前条件下启用插件
        new chrome.declarativeContent.SetIcon({ imageData: { 16: png16 } }), // 将图标设置为彩色, manifest.js 中默认图标为灰色
      ],
    }
    let rules = [enableRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});

chrome.tabs.onActivated.addListener((calb) => {
  chrome.action.setBadgeText({ text: 'ON' }); // 增加文字
})


// 监听 url 地址改变, 与 manifest.json 中 content_scripts 配置的一样
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url || !tab.url.startsWith('https://seller.shopee.cn')) {
    return
  }
  if (changeInfo.status !== 'complete') {
    return
  }
  chrome.tabs.sendMessage(tabId, {type: 'urlChange', url: tab.url})
})
