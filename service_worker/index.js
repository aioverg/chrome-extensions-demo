importScripts('../utils/webConfig.js')

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

// 获取登录状态
const loginStatusApi = (callback) => {
  try {
    fetch(
      `${momoDomain}/apiv2/item/check/api/v1/auth`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      }
    )
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        callback && callback(true)
      } else {
        callback && callback(false)
      }
    })
  } catch(error) {
    consol.error("=====登录校验出错=====", error)
    callback && callback(false)
  }
}

// momo 导入接口
const importMomoApi = async (data) => {
  return fetch(
    `${momoDomain}/apiv2/item/goodsBatch/api/v1/importShopee`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: data,
    }
  )
  .then(response => response.json())
  .then(response => {
    if (response.success) {
      return Promise.resolve(response.data.goodsList[0])
    } else {
      return Promise.resolve(response.data.goodsList[0])
    }
  })
  .catch(err => {
    console.warn('=====导入出错=====', err)
    return Promise.resolve(false)
  })
}

// momo 导入
const importMomo = async (dataArr, port) => {
  const result = []
  const reply = {
    type: 'loading',
    successIds: [],
    failIds: [],
    message: '',
  }
  const iter = async (index) => {
    const params = {}
    Object.keys(dataArr[index].data).forEach(i => {
      params[i] = JSON.stringify(dataArr[index].data[i])
    })

    const res = await importMomoApi(JSON.stringify([params]))
    result.push(res)
    if (res && res.success) {
      reply.successIds.push(dataArr[index].__affix__.id)
    } else {
      reply.failIds.push(dataArr[index].__affix__.id)
      if (reply.message) {
        reply.message = res.data.goodsList[0].errorMsg
      }
    }
    port.postMessage(reply)
    if (result.length === dataArr.length) {
      return Promise.resolve()
    } else {
      await iter(index + 1)
    }
  }
  await iter(0)

  if (reply.successIds.length && reply.failIds.length) {
    reply.type = 'someSuccess'
  } else if (reply.successIds.length && !reply.failIds.length) {
    reply.type = 'success'
  } else if (!reply.successIds.length && reply.failIds.length) {
    reply.type = 'error'
  }
  port.postMessage(reply)
}

// 监听 url 地址改变, 与 manifest.json 中 content_scripts 配置的一样
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url || changeInfo.status !== 'complete') {
    return
  }

  // 向 content 通信
  if (tab.url.startsWith(aimWebs.shopee.domain)) {
    chrome.tabs.sendMessage(
      tabId, 
      { type: 'urlChange', url: tab.url },
    )
    loginStatusApi((val) => {
      chrome.tabs.sendMessage(
        tabId, 
        { type: 'loginStatus', status: val },
      )
    })
    return
  }
})

// 接收长连接消息
chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(res) {
    switch(res.type) {
      case 'import':
        importMomo(res.data, port)
        break
      default:
        console.warn('=====不能处理此长连接消息=====', res)
    }
  });
});

// 一次性接收信息
chrome.runtime.onMessage.addListener( (res, sender, sendResponse) => {
  switch(res.type) {
    case 'loginStatus':
      loginStatusApi((val) => {
        sendResponse({ type: 'loginStatus', status: val })
      })
      // 回复异步消息
      return true
    default:
      console.warn('=====不能处理此一次性消息=====', res)
  }
})