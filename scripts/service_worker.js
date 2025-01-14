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

// 检查是否登录
const checkLogin = async (callback) => {
  const cookies = await chrome.storage.local.get(["cookies"])
  const formData = new FormData()
  formData.append('doAction', 'enterprise')
  fetch(
    'https://test.momo.dgbase.top/FrameServlet.do',
    {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': cookies,
      },
      body: formData,
    }
  )
  .then(res => res.body.getReader().read())
  .then(res => {
    if (res.done && !res.value) {
      callback && callback(true)
    } else {
      callback && callback(false)
    }
    return Promise.resolve()
  })
}

// 监听 url 地址改变, 与 manifest.json 中 content_scripts 配置的一样
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url || changeInfo.status !== 'complete') {
    return
  }

  // 检查是否登录
  if (tab.url.startsWith('https://seller.shopee.cn')) {
    chrome.tabs.sendMessage(
      tabId, 
      { type: 'urlChange', url: tab.url },
    )
    checkLogin((val) => {
      chrome.tabs.sendMessage(
        tabId, 
        { type: 'loginStatus', status: val },
      )
    })
    return
  }

  // 获取 momo cookies
  if (tab.url.startsWith('https://test.momo.dgbase.top')) {
    chrome.cookies.getAll(
      {
        domain: ".momo.dgbase.top",
        // name: 'JSESSIONID',
      },
      (res) => {
        let cookies = ''
        res.forEach((i) => {
          cookies += `${i.name}=${i.value}${cookies ? ';' : ''}`
        })
        chrome.storage.local.set({cookies: cookies})
      }
    )
    return
  }
})

// 接收信息
chrome.runtime.onMessage.addListener( (res, sender, sendResponse) => {
  switch(res.type) {
    case 'import':
      const data = []
      res.data.forEach(i => {
        const item = {}
        Object.keys(i.data).forEach(j => {
          item[j] = JSON.stringify(i.data[j])
        })
        data.push(item)
      })
      if (sender.tab) {
        // 商品导入
        if (res.type === 'import') {
          chrome.storage.local.get(["cookies"]).then(val => {
            fetch(
              // 'http://192.168.20.205:9000/item/goodsBatch/api/v1/importShopee?_public_key=momo',
              // 'https://dev.api.dgbase.top/item/goodsBatch/api/v1/importShopee?_public_key=momo',
              'http://test.api.dgbase.top/item/goodsBatch/api/v1/importShopee?_public_key=momo',
              {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  // 'cookie': val.cookies,
                  // 'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDI3NTU1OSwiZXhwIjoxNzYxODExNTU5LCJ1c2VyIjoie1wiYXR0YWNobWVudHNcIjp7fSxcImlkXCI6MjAwMDAsXCJ0ZW5hbnRJZFwiOjEwMDAwLFwic2hvcElkXCI6MTAwMDAsXCJ1c2VybmFtZVwiOlwiYWRtaW5cIixcImd1ZXN0XCI6ZmFsc2UsXCJmb3JiaWRkZW5cIjpmYWxzZSxcImNvb2tpZURvbWFpblwiOlwiLmxvY2FsaG9zdFwifSJ9.fhT8A-5xruWAvKmTQFNgNTV3SLML2iMl6_BPCwewRxs',
                },
                body: JSON.stringify(data),
              }
            )
            .then(response => response.json())
            .then(response => {
              if (response.success) {
                const successIds = []
                if (response.data.successThridIdList.length) {
                  for (const i of res.data) {
                    if (i.data.mpSkuJson && response.data.successThridIdList.includes(toString(i.data.mpSkuJson.id.toString()))) {
                      successIds.push(i.__affix__.id)
                    } else if (i.data.mtSkuJson && response.data.successThridIdList.includes(i.data.mtSkuJson.mtsku_item_id.toString())) {
                      successIds.push(i.__affix__.id)
                    }
                  }
                }
                let type = 'error'
                if (successIds.length) {
                  if (successIds.length === res.data.length) {
                    type = 'success'
                  } else {
                    type = 'someSuccess'
                  }
                }
                sendResponse({ type: type, ids: successIds })
              } else {
                sendResponse({type: 'error', ids: [] })
              }
              console.log('=====导入结果=====', data)
            })
            .catch(err => {
              console.warn('=====导入出错=====', err)
              sendResponse({type: 'error', ids: [] })
            })
          })
          // 回复异步消息
          return true
        }
      }
      break
    case 'loginStatus':
      checkLogin((val) => {
        sendResponse({ type: 'loginStatus', status: val })
      })
      // 回复异步消息
      return true
    default:
      console.warn('=====不能处理此消息=====', res)
      
  }

})
