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
  // const png16 = await loadImageData("/icons/16.png")

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
        // new chrome.declarativeContent.SetIcon({ imageData: { 16: png16 } }), // 将图标设置为彩色, manifest.js 中默认图标为灰色
      ],
    }
    let rules = [enableRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});

chrome.tabs.onActivated.addListener((calb) => {
  // chrome.action.setBadgeText({ text: 'ON' }); // 增加文字
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

// 接受 content_script 的信息
chrome.runtime.onMessage.addListener( (res, sender, sendResponse) => {
  const data = []
  res.data.forEach(i => {
    const item = {}
    Object.keys(i).forEach(j => {
      item[j] = JSON.stringify(i[j])
    })
    data.push(item)
  })
  if (sender.tab) {
    // 商品导入
    if (res.type === 'import') {
      chrome.storage.local.get(["user"]).then(user => {
        fetch(
          // 'http://192.168.20.205:9000/item/goodsBatch/api/v1/importShopee?_public_key=momo',
          // 'https://dev.api.dgbase.top/item/goodsBatch/api/v1/importShopee?_public_key=momo',
          'http://test.api.dgbase.top/item/goodsBatch/api/v1/importShopee?_public_key=momo',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              // 'Cookie': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDI3NTU1OSwiZXhwIjoxNzYxODExNTU5LCJ1c2VyIjoie1wiYXR0YWNobWVudHNcIjp7fSxcImlkXCI6MjAwMDAsXCJ0ZW5hbnRJZFwiOjEwMDAwLFwic2hvcElkXCI6MTAwMDAsXCJ1c2VybmFtZVwiOlwiYWRtaW5cIixcImd1ZXN0XCI6ZmFsc2UsXCJmb3JiaWRkZW5cIjpmYWxzZSxcImNvb2tpZURvbWFpblwiOlwiLmxvY2FsaG9zdFwifSJ9.fhT8A-5xruWAvKmTQFNgNTV3SLML2iMl6_BPCwewRxs',
              // 'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDI3NTU1OSwiZXhwIjoxNzYxODExNTU5LCJ1c2VyIjoie1wiYXR0YWNobWVudHNcIjp7fSxcImlkXCI6MjAwMDAsXCJ0ZW5hbnRJZFwiOjEwMDAwLFwic2hvcElkXCI6MTAwMDAsXCJ1c2VybmFtZVwiOlwiYWRtaW5cIixcImd1ZXN0XCI6ZmFsc2UsXCJmb3JiaWRkZW5cIjpmYWxzZSxcImNvb2tpZURvbWFpblwiOlwiLmxvY2FsaG9zdFwifSJ9.fhT8A-5xruWAvKmTQFNgNTV3SLML2iMl6_BPCwewRxs',
            },
            body: JSON.stringify(data),
          }
        )
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            sendResponse({ type: data.successThridIdlist.length === data.length ? 'success' : 'someSuccess', ids: data.successThridIdlist })
          } else {
            sendResponse({type: 'error', ids: [] })
          }
          console.log('=====导入结果=====', data)
        })
        .catch(err => {
          sendResponse({type: 'error', ids: [] })
        })
      })
      // 回复异步消息
      return true
    }
  }
})
