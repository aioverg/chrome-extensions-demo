// 登录状态
const loginStatus = status => {
  const noLogonDoms = document.getElementsByClassName('noLogin')
  const loginDoms = document.getElementsByClassName('login')
  if (status === 'success') {
    for (const i of noLogonDoms) {
      i.classList.remove('show')
      i.classList.add('hidden')
    }
    for (const i of loginDoms) {
      i.classList.remove('hidden')
      i.classList.add('show')
    }
  } else if (status === 'fail') {
    for (const i of noLogonDoms) {
      i.classList.remove('hidden')
      i.classList.add('show')
    }
    for (const i of loginDoms) {
      i.classList.remove('show')
      i.classList.add('hidden')
    }
  }
}

// 登录
const login = () => {
  loginStatus('success')
  localStorage.setItem('user', JSON.stringify({token: '1111111'}))
}

// 退出登录
const logout = () => {
  localStorage.clear()
  loginStatus('fail')
}

// 获取用户信息
const getUser = () => {
  return Promise.resolve('success')
}

document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM 完全加载和解析", localStorage);
  const user = localStorage.getItem("user")
  if (user) {
    // 获取用户信息, 验证token是否失效
    const res = await getUser()
    if (res === 'fail') {
      // token 失效
      logout()
    } else if (res === 'success') {
      // token 可用
      localStorage.setItem('user', JSON.stringify({token: '1111111'}))
      loginStatus('success')
    }
  } else {
    logout('fail')
  }
});

// 登录
const loginBt = document.getElementById('login')
loginBt.onclick = login

// 退出登录
const logoutBt = document.getElementById('logout')
logoutBt.onclick = logout

// 关闭弹窗
const closeBt = document.getElementById('close')
closeBt.onclick = () => {
  window.close()
}

// 消息监听
chrome.runtime.onMessage.addListener((res, sender, sendResponse) => {
  // 从 content.js 来的消息
  if (sender.tab) {
    // 商品导入
    if (res.type === 'in') {
      console.log('商品列表', res.data)
      sendResponse('接收成功')
    }
  }
})

// 向 content 发送信息
const sendContentMessage = async () => {
  // 获取当前激活的tab
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})

  // 发送信息
  const res = await chrome.tabs.sendMessage(tab.id, {type: 'CollectData'})


  console.log('接受的回复信息', res)
}
