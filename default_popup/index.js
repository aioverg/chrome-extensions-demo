// 选择数据
const SelectDataButton = document.getElementById('SelectData')
SelectDataButton.onclick = async () => {
  // 获取当前激活的tab
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})

  const res = await chrome.tabs.sendMessage(tab.id, {type: 'SelectData'})

  console.log('选择数据回传信息', res)
}

// 采集数据
const CollectDataButton = document.getElementById('CollectData')
CollectDataButton.onclick = async () => {
  // 获取当前激活的tab
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})

  const res = await chrome.tabs.sendMessage(tab.id, {type: 'CollectData'})

  console.log('采集数据回传信息', res)
}