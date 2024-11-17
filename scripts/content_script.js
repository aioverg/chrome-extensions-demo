// 触发采集弹窗
function collectDialog () {
  const dom = `<div class="collectDialog">
    <div class="collectDialog-left">
      <span>當前頁支持批量採集，請</span>
      <span style="color: #DC3545">勾選商品</span>
      <span>後，再點擊搬家按鈕</span>
      <button class="collectDialog-button">一鍵搬家</button>
    </div>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#5E6999"/>
<g clip-path="url(#clip0_214_1854)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1694 17.3813H18.7665C19.2086 17.3813 19.5665 17.7304 19.5694 18.161V21.5501C19.5694 21.9777 19.2086 22.3268 18.7665 22.3268H13.1694C12.7272 22.3268 12.3665 21.9806 12.3665 21.5501V18.161C12.3665 17.7304 12.7272 17.3813 13.1694 17.3813ZM17.7366 21.0933C17.9694 21.0933 18.1585 20.9101 18.1585 20.6832H18.1555V19.025C18.1555 18.7981 17.9665 18.6148 17.7337 18.6148H14.2108C13.9781 18.6148 13.789 18.7981 13.789 19.025V20.6832C13.789 20.9101 13.9781 21.0933 14.2108 21.0933H17.7366Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.6 17.3813H35.1971C35.6393 17.3813 36 17.7304 36 18.161V21.5501C36 21.9777 35.6393 22.3268 35.1971 22.3268H29.6C29.1579 22.3268 28.8 21.9777 28.8 21.5472V18.1581C28.8 17.7304 29.1579 17.3813 29.6 17.3813ZM33.1171 21.6461C33.1375 21.649 33.4488 21.6228 33.5739 21.585C34.1935 21.4599 34.7113 20.9712 34.7142 20.0548C34.7142 19.4352 34.1295 18.2308 32.2444 18.0533C31.651 18.1435 30.0888 18.7312 30.0888 20.0955C30.0888 20.5348 30.3157 20.9537 30.7026 21.3057C30.9731 21.553 31.3513 21.7043 31.2728 21.6315C31.1506 21.5152 31.1128 21.2737 31.1419 21.1195C31.2233 20.7093 31.555 20.5872 31.555 20.5872C31.555 20.5872 31.4124 21.4861 32.8262 21.6286C32.9106 21.6403 33.1055 21.6461 33.1171 21.6461Z" fill="white"/>
<path d="M10.6996 17.3818H4.8C4.35782 17.3818 4 17.7309 4 18.1586V22.3273H5.49818V18.8364H6.99927V22.3273H8.50036V18.8364H10.0015V22.3273H11.5025V18.1586C11.5025 17.7309 11.1418 17.3818 10.6996 17.3818Z" fill="white"/>
<path d="M27.133 17.3818H21.2333C20.7912 17.3818 20.4333 17.7309 20.4333 18.1586V22.3273H21.9315V18.8364H23.4326V22.3273H24.9337V18.8364H26.4348V22.3273H27.9359V18.1586C27.933 17.7309 27.5752 17.3818 27.133 17.3818Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_214_1854">
<rect width="32" height="4.94545" fill="white" transform="translate(4 17.3818)"/>
</clipPath>
</defs>
</svg>

  </div>`
  document.body.insertAdjacentHTML('afterend', dom)
}


(async () => {
  console.log('内容启动运行');
  collectDialog()
  
})();

// 与插件通信
chrome.runtime.onMessage.addListener((res, sender, sendRes) => {
  console.log('弹出页过来的消息', sender.tab ? 'fomr a content script' + sender.tab.url : 'from the 插件')

  // 选择数据
  if (res.type === "SelectData") {
    const doms = document.getElementsByClassName('HotItem')
    for(const i of doms) {
      i.insertAdjacentHTML('afterbegin', "<input type='checkbox' style='width:30px;height: 30px' class='momoCheck' value='1' />")
    }
    sendRes({num: doms.length})
  }

  // 采集数据
  if (res.type === "CollectData") {
    // 请求数据
    const getData = async () => {
      const fetchRes = await fetch('/api/v4/me?include=is_realname,ad_type,available_message_types,default_notifications_count,follow_notifications_count,vote_thank_notifications_count,messages_count,email,account_status,is_bind_phone,following_question_count,is_force_renamed,renamed_fullname,is_destroy_waiting',{ method: 'get' })
      const fetcData = await fetchRes.json()
      return Promise.resolve(fetcData)
    }

    // 或许选中的数据
    const doms = document.getElementsByClassName('momoCheck')

    getData().then(resData => {
      sendRes({...resData, num: doms.length})
    })

    return true
  }
})