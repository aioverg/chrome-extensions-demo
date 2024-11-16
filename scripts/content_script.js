(async () => {
  console.log('内容启动运行');
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