const web = {
  shopee: {
    name: 'shopee',
    href: 'https://seller.shopee.tw/',
    pages: [
      /portal\/product\/mtsku\/list/,
      /portal\/mtsku\/[0-9]+/,
      /portal\/product\/list\/all/,
      /portal\/product\/[0-9]+/,
    ]
  }
}

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
  console.log("=====DOM 完全加载和解析=====");

  // 向插件发送信息并接受回复
  chrome.runtime.sendMessage({
    type: 'loginStatus',
  }, res => {
    if (res.status) {
      step1SuccessDom.classList.remove('hidden')
      step1ErrorDom.classList.add('hidden')
    } else {
      step1SuccessDom.classList.add('hidden')
      step1ErrorDom.classList.remove('hidden')
    }

    if (step1SuccessDom.classList.contains('hidden') || step2SuccessDom.classList.contains('hidden')) {
      successHintDom.classList.add('hidden')
      loginStatusBoxDom.style.background = '#F6F7FA'
    } else {
      successHintDom.classList.remove('hidden')
      loginStatusBoxDom.style.background = '#EDF7EF'
    }
  })

  chrome.tabs.query(
    {active: true, currentWindow: true},
    (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.startsWith(web.shopee.href) && web.shopee.pages.find(i => tabs[0].url.match(i))) {
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