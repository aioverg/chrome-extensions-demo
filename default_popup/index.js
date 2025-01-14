const loginStatusBoxDom = document.getElementById('login_status_box')
const successHintDom = document.getElementById('success-hint')
const step1SuccessDom = document.getElementById('step1_success')
const step1ErrorDom = document.getElementById('step1_error')
const step2SuccessDom = document.getElementById('step2_success')
const step2ErrorDom = document.getElementById('step2_error')


// 获取用户信息
const getUser = () => {
  return Promise.resolve('success')
}

// 关闭弹窗
const closeBt = document.getElementById('close')
closeBt.onclick = () => {
  window.close()
}


document.addEventListener("DOMContentLoaded", async (event) => {
  const cookies = await chrome.storage.local.get(["cookies"])
  console.log("DOM 完全加载和解析", cookies);
  if (!cookies) {
    return
  }
  const user = true
  if (user) {
    // 获取用户信息, 验证token是否失效
    const res = await getUser()
    if (res === 'fail') {
      // token 失效
      step1SuccessDom.classList.add('hidden')
      step1ErrorDom.classList.remove('hidden')
    } else if (res === 'success') {
      step1SuccessDom.classList.remove('hidden')
      step1ErrorDom.classList.add('hidden')
    }
  } else {
    step1SuccessDom.classList.add('hidden')
    step1ErrorDom.classList.remove('hidden')
  }

  chrome.tabs.query(
    {active: true, currentWindow: true},
    (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.startsWith('https://seller.shopee.cn')) {
        step2SuccessDom.classList.remove('hidden')
        step2ErrorDom.classList.add('hidden')
      } else {
        step2SuccessDom.classList.add('hidden')
        step2ErrorDom.classList.remove('hidden')
      }

      if (step1SuccessDom.classList.contains('hidden') || step2SuccessDom.classList.contains('hidden')) {
        successHintDom.classList.add('hidden')
        loginStatusBoxDom.style.background = '#F6F7FA'
      } else {
        successHintDom.classList.remove('hidden')
        loginStatusBoxDom.style.background = '#EDF7EF'
      }
    }
  );
})