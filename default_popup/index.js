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
  chrome.storage.local.set({ user: JSON.stringify({token: '1111111'}) })
  const dom = document.getElementById('login-id-err-hint')
  dom.classList.remove('login-err-hint-hidden')
}

// 退出登录
const logout = () => {
  chrome.storage.local.clear()
  loginStatus('fail')
  const dom = document.getElementById('login-id-err-hint')
  dom.classList.add('login-err-hint-hidden')
}

// 获取用户信息
const getUser = () => {
  return Promise.resolve('fail')
}

// 取消
const cancelBt = document.getElementById('cancel')
cancelBt.onclick = () => {
  window.close()
}

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

document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM 完全加载和解析", localStorage);
  const user = await chrome.storage.local.get(["user"])
  if (user) {
    // 获取用户信息, 验证token是否失效
    const res = await getUser()
    if (res === 'fail') {
      // token 失效
      logout()
    } else if (res === 'success') {
      // token 可用
      chrome.storage.local.set({ user: JSON.stringify({token: '1111111'}) }).then(() => {
        loginStatus('success')
      });
    }
  } else {
    logout('fail')
  }
})