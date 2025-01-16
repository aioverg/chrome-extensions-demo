// 批量采集注入标识
const injectTarget = {
  tableClass: 'momo-inject-class-table',
  allCheckboxId: 'momo-inject-id-all-checkbox',
  checkboxClass: 'momo-inject-class-checkbox',
}

// 通用 checkbox 事件
function checkedEvent (e, checkAllDomId, checkGroupParentClassName, checkGroupClassName) {
  if (!(e.target.id === checkAllDomId || e.target.classList.contains(checkGroupClassName))) { return }
  const checkAllDom = document.getElementById(checkAllDomId)
  checkAllDom.classList.remove('momo-all-checkbox-noCheckedAll')

  // 全选
  if (e.target.id === checkAllDomId) {
    const checkBoxDoms = document.getElementsByClassName(checkGroupParentClassName)[0].getElementsByClassName(checkGroupClassName)
    for (const i of checkBoxDoms) {
      i.checked = e.target.checked
    }
    return
  }

  // 单选
  let checkAllType = ''
  const checkBoxDoms = document.getElementsByClassName(checkGroupParentClassName)[0].getElementsByClassName(checkGroupClassName)
  if (e.target.checked) {
    checkAllType = 'checkedAll'
    for (const i of checkBoxDoms) {
      if (!i.checked) {
        checkAllType = 'noCheckedAll'
        break
      }
    }
  } else {
    checkAllType = 'noChecked'
    for (const i of checkBoxDoms) {
      if (i.checked) {
        checkAllType = 'noCheckedAll'
        break
      }
    }
  }
  
  if (checkAllType === 'checkedAll') {
    checkAllDom.checked = true
  } else if (checkAllType === 'noChecked') {
    checkAllDom.checked = false
  } else if (checkAllType === 'noCheckedAll') {
    checkAllDom.checked = false
    checkAllDom.classList.add('momo-all-checkbox-noCheckedAll')
  }
}

// 批量采集注入 checkbox 事件
function injectCheckboxEvent (e) {
  checkedEvent(e, injectTarget.allCheckboxId, injectTarget.tableClass, injectTarget.checkboxClass)
}

// 采集仓库 checkbox 事件
function warehouseCheckedEvent (e) {
  checkedEvent(e, 'momo-id-all-checkbox', 'momo-class-table', 'momo-checkbox')
}

// 采集失败 dialog
function collectFailDialog() {
  const destroyDom = document.getElementById('momo-id-collect-fail-dialog')
  destroyDom && destroyDom.remove()
  const dom = `
    <dialog id="momo-id-collect-fail-dialog" class="momo-dialog">
      <form method="dialog">
        <div class="momo-dialog-head">
          <span style="color: #DC3545;">采集失败</span>
          <button class="momo-dialog-close" value="cancel">${momoIcon.colse2}</button>
        </div>
        <div style="padding: 24px 24px 36px 24px; color: #111827;">
          <div style="height: 36px;">因为系统异常，导致商品采集失败，请重新采集。</div>
        </div>
        <div class="momo-dialog-bottom">
          <button class="momo-button momo-button-color-2" value="cancel">我知道了</button>
        </div>
      </form>
    </dialog>
  `
  document.body.insertAdjacentHTML('afterend', dom)
  const dialogDom = document.getElementById("momo-id-collect-fail-dialog");
  dialogDom.showModal();
}

// 采集结果 dialog
function collectResultDialog(val = {type: 'collectFailed', num: 0}) {
  const destroyDom = document.getElementById('collect-id-result-dialog')
  destroyDom && destroyDom.remove()

  const contentDom = {
    collectFailed: {
      title: '採集失敗',
      titleColor: '#343A40',
      contentText: '系統異常，商品採集失敗，請重新採集',
      btText: '我知道了',
    },
    collectSuccess: {
      title: '採集成功',
      titleColor: '#343A40',
      contentText: `本次共採集 <span style="color: #5A72DB;">${val.num}</span> 個商品，可到「插件-採集商品庫」中查看已採集商品`,
      btText: '去查看已採集商品庫',
    },
    collectSomeSuccess: {
      title: '部分採集成功',
      titleColor: '#343A40',
      contentText: `部分商品採1集成功，本次成功探集 <span style="color: #5A72DB;">${val.num}</span> 個商品，可到「插件-採集商品庫」中查看已採集商品`,
      btText: '去查看已采集商品庫',
    },
    importLoading: {
      title: '正在導入中...',
      titleColor: '#343A40',
      contentText: `<div style="color: #111827; line-height: 22px;">當前已導入 <span style="color: #28A745;" id="importLoadingNum">0</span> /${val.num} 個商品。</div><div style="padding-top: 8px; color: #6C757D; line-height: 22px;">請不要關閉瀏覽器，關閉後將停止導入</div><div style="color: #6C757D; line-height: 22px;">可以關閉當前彈框，導入完成後系統會提醒您</div>`,
      btText: '我知道了',
    },
    importFailed: {
      title: '導入失敗',
      titleColor: '#343A40',
      contentText: '系统異常，商品導入失敗，請重新導入',
      btText: '我知道了',
    },
    importSuccess: {
      title: '導入成功',
      titleColor: '#343A40',
      contentText: `本次共導入 <span style="color: #5A72DB;">${val.num}</span> 個商品，已暫存商品，可到「商品管理-商品列表-暫存-搬家暫存」中確認商品資料後，再上架`,
      btText: '去查看已導入商品',
    },
    importSomeSuccess: {
      title: '部分導入成功',
      titleColor: '#343A40',
      contentText: `部分商品導入失敗，本次成功導入 <span style="color: #5A72DB;">${val.num}</span> 個商品，已暫存商品，可到「商品管理-商品列表-暫存-搬家暫存」中確認商品資料後，再上架`,
      btText: '去查看已導入商品',
    }
  }

  const dom = `
    <dialog id="collect-id-result-dialog" class="momo-dialog">
      <form method="dialog" style="width: 480px;">
        <div class="momo-dialog-head">
          <span style="color: ${contentDom[val.type].titleColor};">${contentDom[val.type].title}</span>
          <button class="momo-dialog-close" value="cancel">${momoIcon.colse2}</button>
        </div>
        <div style="padding: 24px 24px 36px 24px; color: #111827;">${contentDom[val.type].contentText}</div>
        <div class="momo-dialog-bottom">
          <button id="viewWarehouse" class="momo-button momo-button-color-2" value="cancel">${contentDom[val.type].btText}</button>
        </div>
      </form>
    </dialog>
  `
  document.body.insertAdjacentHTML('afterend', dom)
  const dialogDom = document.getElementById("collect-id-result-dialog");
  dialogDom.showModal();

  const viewWarehouseBt = document.getElementById('viewWarehouse')
  viewWarehouseBt.onclick = () => {
    switch (val.type) {
      case 'collectFailed':
      case 'importFailed':
      case 'importLoading':
        break;
      case 'collectSuccess':
      case 'collectSomeSuccess':
        collectWarehouse()
        break;
      case 'importSuccess':
      case 'importSomeSuccess':
        window.open("https://test.momo.dgbase.top/v2/products/new-product-list");
        break;
      default:
        console.warn('=====dialog 未知类型=====', val)
    }
    
  }
}

// 采集仓库 dialog
function collectWarehouse() {

  const destoryCheckEvent = document.getElementsByClassName('momo-class-table')[0]
  destoryCheckEvent && destoryCheckEvent.removeEventListener('click', warehouseCheckedEvent)
  
  const destroyDom = document.getElementById('momo-id-warehouse-dialog')
  destroyDom && destroyDom.remove()

  aimWeb.db.getAll().onsuccess = (res => {
    const tbodyDom = res.target.result.map((i, j) => (`
      <div class="momo-table-tr">
        <div class="momo-table-cell" style="48px">
          <input type="checkbox" class="momo-checkbox" data-index=${j} />
        </div>
        <div class="momo-table-cell" style="flex: 1;">${i.value.__affix__.name}</div>
        <div class="momo-table-cell" style="width: 150px">${i.value.__affix__.price[0].toFixed(2)}${i.value.__affix__.price[1] ? ' - ' + i.value.__affix__.price[1].toFixed(2) : ''}</div>
        <div class="momo-table-cell" style="width: 100px">${i.value.__affix__.stock}</div>
        <div class="momo-table-cell" style="width: 130px">${i.value.__affix__.isImport ? '是' : '否'}</div>
      </div>`)).join('')

    const dom = `
      <dialog id="momo-id-warehouse-dialog" class="momo-dialog">
        <form method="dialog">
          <div class="momo-dialog-head">
            <span style="color: #DC3545;">採集商品庫</span>
            <button id="momo-id-default-cancal" class="momo-dialog-close" value="cancel">${momoIcon.colse2}</button>
          </div>
          <div style="width: 640px; padding: 24px 0; height: 472px;">
            <div class="momo-table momo-class-table">
              <div class="momo-table-thead" style="padding-right: ${res.target.result.length > 6 ? '29px' : '24px'}">
                <div class="momo-table-tr">
                  <div class="momo-table-cell" style="48px">
                    <input type="checkbox" id="momo-id-all-checkbox" class="momo-all-checkbox" />
                  </div>
                  <div class="momo-table-cell" style="flex: 1;">商品名称</div>
                  <div class="momo-table-cell" style="width: 150px">售价</div>
                  <div class="momo-table-cell" style="width: 100px">库存量</div>
                  <div class="momo-table-cell" style="width: 130px">歷史是否已導入</div>
                </div>
              </div>
              <div class="momo-table-tbody" id="momo-id-table-tbody">${tbodyDom}</div>
            </div>
          </div>
        </form>
        <div class="momo-dialog-bottom">
          <button id="momo-id-cancal" class="momo-button momo-button-color-3" value="cancel" style="width: 88px; margin: 0 12px 0 0; color: #343A40;">取消</button>
          <button id="momo-id-import-confirm" class="momo-button momo-button-color-2" value="cancel">確認導入</button>
        </div>
      </dialog>
    `
      document.body.insertAdjacentHTML('afterend', dom)
      const dialogDom = document.getElementById("momo-id-warehouse-dialog");
      dialogDom.showModal();

      const momoTableDom = document.getElementsByClassName('momo-class-table')[0]
      momoTableDom.addEventListener('click', warehouseCheckedEvent)


      // 取消
      const cancalDom = document.getElementById('momo-id-cancal')
      cancalDom.onclick = () => {
        document.getElementById('momo-id-default-cancal').click()
      }

      // 导入
      const confirmDom = document.getElementById('momo-id-import-confirm')
      confirmDom.onclick = () => {
        confirmDom.disabled = true
        confirmDom.classList.add('momo-button-disabled')
        const data = []
        const checkboxDoms = document.getElementById('momo-id-table-tbody').getElementsByClassName('momo-checkbox')
        for (const i of checkboxDoms) {
          i.checked && data.push(res.target.result[i.dataset.index].value)
        }
        // 向插件发送消息
        const port = chrome.runtime.connect({name: "importMomo"})
        port.postMessage({
          type: 'import',
          data: data,
        })
        collectResultDialog({ type: 'importLoading', num: data.length })
        port.onMessage.addListener(function(res) {
          switch(res.type) {
            case 'loading':
              const importLoadingNumDom = document.getElementById('importLoadingNum')
              if (importLoadingNumDom) {
                importLoadingNumDom.innerText = res.successIds.length + res.failIds.length
              }
              break
            case 'error':
              collectResultDialog({type: 'importFailed'})
              break
            case 'success':
              collectResultDialog({ type: 'importSuccess', num: res.successIds.length })
              aimWeb.db.update(res.successIds, true, cancalDom.click())
              break
            case 'someSuccess':
              collectResultDialog({ type: 'importSomeSuccess', num: res.successIds.length })
              aimWeb.db.update(res.successIds, true, cancalDom.click())
              break
            default:
              console.warn('=====不能处理此上传回复消息=====')
          }
        })
      }
  })
}

// 开启关闭 tip
function switchTip(id, className, type) {
  const tipDom = document.getElementById(id)
  if (type === 'show') {
    tipDom.classList.remove(`${className}-hidden`)
    tipDom.classList.add(`${className}-show`)
  } else {
    tipDom.classList.remove(`${className}-show`)
    tipDom.classList.add(`${className}-hidden`)
  }
}

// 单品采集 tip
function singleCollectTip() {
  const dom = `
    <div id="momo-id-single-collect-tip" class="momo-collect-tip momo-single-collect-tip-hidden">
      <div id="momo-id-single-collect-close" class="icon-close">${momoIcon.close1}</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="margin: 0 12px 0 0">當前頁支持單品採集，<br />請點擊搬家按鈕，採集商品</span>
        <button id="momo-id-single-collect-storage" class="momo-button momo-button-color-1">一鍵搬家</button>
      </div>
      <span class="icon-arrow">${momoIcon.arrow}</span>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  // 关闭 tip
  const closeDom = document.getElementById('momo-id-single-collect-close')
  closeDom.onclick = () => switchTip('momo-id-single-collect-tip', 'momo-single-collect-tip', 'hidden')

  // 一键搬家
  const singleCollectStorage = document.getElementById('momo-id-single-collect-storage')
  singleCollectStorage.onclick = async () => {
    const res = await aimWeb.curPage.getData()
    aimWeb.db.put({id: res.__affix__.id, value: res})
    collectResultDialog({type: 'collectSuccess', num: 1})
  }
}

// 批量采集 tip1
function batchCollectTip1() {
  let rootDom = null
  let curRootDom = null
  const dom = `
    <div id="momo-id-batch-collect-tip-1" class="momo-collect-tip momo-batch-collect-tip-1-hidden">
      <div id="momo-id-batch-collect-1-close" class="icon-close">${momoIcon.close1}</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="margin: 0 12px 0 0">當前頁支持批量採集，<br/>請<span style="color: #DC3545">勾選商品</span>後，再點擊搬家按鈕</span>
        <button id="momo-id-batch-collect-button" class="momo-button momo-button-color-1">採集</button>
      </div>
      <span class="icon-arrow">${momoIcon.arrow}</span>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  // 关闭 tip
  const closeDom1 = document.getElementById('momo-id-batch-collect-1-close')
  closeDom1.onclick = () => switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'hidden')

  // 列表插入选择框
  const batchCollectBt = document.getElementById('momo-id-batch-collect-button')
  batchCollectBt.onclick = () => {
    if (aimWeb.curPage.targetId) {
      curRootDom = document.getElementById(aimWeb.curPage.targetId)
    } else if (aimWeb.curPage.targetClass) {
      curRootDom = document.getElementsByClassName(aimWeb.curPage.targetClass)[0]
    }
    if (!curRootDom) {
      throw new Error('列表插入 checkbox 出错')
    }
    if (!curRootDom.classList.contains(injectTarget.tableClass)) {
      rootDom && (rootDom.removeEventListener('click', injectCheckboxEvent))
      rootDom = curRootDom
      rootDom.classList.add(injectTarget.tableClass)
    }
    aimWeb.curPage.injectDom()
    switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'hidden')
    switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'show')
  }
}

// 批量采集 tip2
function batchCollectTip2() {
  const dom = `
    <div id="momo-id-batch-collect-tip-2" class="momo-collect-tip momo-batch-collect-tip-2-hidden">
      <div id="momo-id-batch-collect-2-close" class="icon-close">${momoIcon.close1}</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="margin: 0 12px 0 0">請<span style="color: #DC3545">勾選商品</span>後，再點擊搬家按鈕</span>
        <button id="momo-id-batch-collect-storage" class="momo-button momo-button-color-1">一鍵搬家</button>
      </div>
      <span class="icon-arrow">${momoIcon.arrow}</span>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  // 关闭 tip
  const closeDom2 = document.getElementById('momo-id-batch-collect-2-close')
  closeDom2.onclick = () => switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'hidden')

  // 一键搬家
  const batchCollectStorage = document.getElementById('momo-id-batch-collect-storage')
  batchCollectStorage.onclick = async () => {
    const res = await aimWeb.curPage.getData()
    if (res.type === 'noInjectDom') {
      switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'hidden')
      switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'show')
      return
    } else if (res.type === 'noChecked') {
      return
    } else if (res.type === 'success') {
      res.data.forEach(i => aimWeb.db.put({ id: i.__affix__.id, value: i }))
      collectResultDialog({type: 'collectSuccess', num: res.data.length})
    }
  }
}

// 采集浮窗
function collectFloat() {
  const dom = `
    <div class="momo-collect-float" id="momo-id-collect-float">
      <div id="momo-id-float-content" class="momo-collect-float-content">
        <div id="momo-id-open-warehouse">${momoIcon.warehouse}</div>

        <div id="momo-id-open-collect">${momoIcon.collect}</div>
      </div>

      <div id="momo-id-fold-float">${momoIcon.brand}</div>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  // 展开收起
  const foldBt = document.getElementById('momo-id-fold-float')
  foldBt.onclick = () => {
    if (foldBt.classList.contains('momo-disabled')) {
      const disabledFloatDom = document.getElementById('momo-id-disabled-float')
      disabledFloatDom.classList.remove('momo-hidden')
      return
    }
    const dom = document.getElementById('momo-id-float-content')
    if (dom.classList.contains('momo-unfold-content')) {
      dom.classList.remove('momo-unfold-content')
      setTimeout(() => foldBt.classList.remove('momo-unfold'), 350)
    } else {
      dom.classList.add('momo-unfold-content')
      foldBt.classList.add('momo-unfold')
    }
  }

  // 仓库
  const warehouseBt = document.getElementById('momo-id-open-warehouse')
  warehouseBt.onclick = () => {
    collectWarehouse()
  }

  // 采集 tips
  const collectBt = document.getElementById('momo-id-open-collect')
  collectBt.onclick = () => {
    switch(aimWeb.curPage.type) {
      case 'single':
        switchTip('momo-id-single-collect-tip', 'momo-single-collect-tip', 'show')
        break
      case 'batch':
        const checkDom = document.getElementById(injectTarget.allCheckboxId)
        checkDom ? switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'show') : switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'show')
        break
      default:
        console.warn('=====类型检测出错=====', aimWeb.curPage)
    }
  }
}

// 是否可用浮窗
function disabledFloat() {
  const dom = `
    <div id="momo-id-disabled-float" class="momo-hidden" style="z-index: 9999; width: 340px; padding: 24px 16px; position: fixed; top: 310px; right: 80px; background: #fff; border-radius: 8px; box-shadow: 0px 138px 184px 0px rgba(0, 0, 0, 0.03), 0px 57.653px 76.871px 0px rgba(0, 0, 0, 0.02), 0px 30.824px 41.099px 0px rgba(0, 0, 0, 0.02), 0px 17.28px 23.04px 0px rgba(0, 0, 0, 0.01), 0px 9.177px 12.236px 0px rgba(0, 0, 0, 0.01), 0px 3.819px 5.092px 0px rgba(0, 0, 0, 0.01); ">
      <div style="position: relative; padding-bottom: 16px;">
        <svg width="101" height="16" viewBox="0 0 101 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M28.8137 0H46.4018C47.7913 0 48.9157 1.12941 48.9249 2.52235V13.4871C48.9249 14.8706 47.7913 16 46.4018 16H28.8137C27.4242 16 26.2907 14.88 26.2907 13.4871V2.52235C26.2907 1.12941 27.4242 0 28.8137 0ZM43.1658 12.0094C43.8971 12.0094 44.4913 11.4165 44.4913 10.6824H44.4821V5.31765C44.4821 4.58353 43.8879 3.99059 43.1566 3.99059H32.0864C31.3551 3.99059 30.7609 4.58353 30.7609 5.31765V10.6824C30.7609 11.4165 31.3551 12.0094 32.0864 12.0094H43.1658Z" fill="#5E6999"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M80.4444 0H98.0325C99.422 0 100.556 1.12941 100.556 2.52235V13.4871C100.556 14.8706 99.422 16 98.0325 16H80.4444C79.055 16 77.9306 14.8706 77.9306 13.4776V2.51294C77.9306 1.12941 79.055 0 80.4444 0ZM91.4964 13.7976C91.5604 13.8071 92.5385 13.7224 92.9316 13.6C94.8787 13.1953 96.5059 11.6141 96.515 8.64941C96.515 6.64471 94.6776 2.74824 88.754 2.17412C86.8891 2.46588 81.9802 4.36706 81.9802 8.78118C81.9802 10.2024 82.6932 11.5576 83.909 12.6965C84.7592 13.4965 85.9476 13.9859 85.7008 13.7506C85.3168 13.3741 85.198 12.5929 85.2894 12.0941C85.5453 10.7671 86.5875 10.3718 86.5875 10.3718C86.5875 10.3718 86.1395 13.28 90.5823 13.7412C90.8474 13.7788 91.4599 13.7976 91.4964 13.7976Z" fill="#5E6999"/>
          <path d="M21.0527 0H2.51389C1.12439 0 0 1.12941 0 2.51294V16H4.70783V4.70588H9.4248V16H14.1418V4.70588H18.8587V16H23.5757V2.51294C23.5757 1.12941 22.4422 0 21.0527 0Z" fill="#5E6999"/>
          <path d="M72.6925 0H54.1537C52.7642 0 51.6399 1.12941 51.6399 2.51294V16H56.3477V4.70588H61.0647V16H65.7816V4.70588H70.4986V16H75.2156V2.51294C75.2064 1.12941 74.082 0 72.6925 0Z" fill="#5E6999"/>
        </svg>
        <span style="font-size: 16px; margin-left: 2px; position: relative; bottom: 3px;">小助手</span>
      </div>

      <div style="font-size: 14px; line-height: 20px;">
        <div style="color: #364480; margin-bottom: 4px;">歡迎使用搬家小助手</div>
        <div>同時滿足以下兩個條件，才能使用插件哦~</div>
      </div>

      <div id="momo-id-login_status_box" style="padding: 8px; border-radius: 6px; background: #F6F7FA; margin: 12px 0 16px; font-size: 14px; line-height: 22px;">
        <div style="position: relative;">
          <span style="display: inline-block; width: 20px; height: 20px; position: relative; top: 5px; margin-right: 8px;">
            <svg id="momo-id-step1_success" class="hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.6711 8.15028C13.9152 7.9062 13.9152 7.51047 13.6711 7.26639C13.427 7.02231 13.0313 7.02231 12.7872 7.26639L8.85417 11.1994L7.10861 9.45389C6.86453 9.20981 6.4688 9.20981 6.22472 9.45389C5.98065 9.69797 5.98065 10.0937 6.22472 10.3378L8.41222 12.5253C8.6563 12.7694 9.05203 12.7694 9.29611 12.5253L13.6711 8.15028Z" fill="#28A745"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.875C5.51269 1.875 1.875 5.51269 1.875 10C1.875 14.4873 5.51269 18.125 10 18.125C14.4873 18.125 18.125 14.4873 18.125 10C18.125 5.51269 14.4873 1.875 10 1.875ZM3.125 10C3.125 6.20304 6.20304 3.125 10 3.125C13.797 3.125 16.875 6.20304 16.875 10C16.875 13.797 13.797 16.875 10 16.875C6.20304 16.875 3.125 13.797 3.125 10Z" fill="#28A745"/>
            </svg>
            <svg id="momo-id-step1_error" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125ZM1.875 10C1.875 5.51269 5.51269 1.875 10 1.875C14.4873 1.875 18.125 5.51269 18.125 10C18.125 14.4873 14.4873 18.125 10 18.125C5.51269 18.125 1.875 14.4873 1.875 10ZM7.20108 7.20103C7.44516 6.95696 7.84089 6.95696 8.08497 7.20103L10 9.11611L11.9151 7.20103C12.1592 6.95696 12.5549 6.95696 12.799 7.20103C13.0431 7.44511 13.0431 7.84084 12.799 8.08492L10.8839 10L12.799 11.9151C13.0431 12.1592 13.0431 12.5549 12.799 12.799C12.5549 13.043 12.1592 13.043 11.9151 12.799L10 10.8839L8.08497 12.799C7.84089 13.043 7.44516 13.043 7.20108 12.799C6.95701 12.5549 6.95701 12.1592 7.20108 11.9151L9.11616 10L7.20108 8.08492C6.95701 7.84084 6.95701 7.44511 7.20108 7.20103Z" fill="#DC3545"/>
            </svg>
          </span>
          <span style="display: inline-block;">請先登入momo店+後台</span>
        </div>

        <div style="display: flex; margin-top: 8px;">
          <span style="display: inline-block; width: 20px; height: 20px; position: relative; top: 3px; margin-right: 12px;">
            <svg id="momo-id-step2_success" class="hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.6711 8.15028C13.9152 7.9062 13.9152 7.51047 13.6711 7.26639C13.427 7.02231 13.0313 7.02231 12.7872 7.26639L8.85417 11.1994L7.10861 9.45389C6.86453 9.20981 6.4688 9.20981 6.22472 9.45389C5.98065 9.69797 5.98065 10.0937 6.22472 10.3378L8.41222 12.5253C8.6563 12.7694 9.05203 12.7694 9.29611 12.5253L13.6711 8.15028Z" fill="#28A745"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.875C5.51269 1.875 1.875 5.51269 1.875 10C1.875 14.4873 5.51269 18.125 10 18.125C14.4873 18.125 18.125 14.4873 18.125 10C18.125 5.51269 14.4873 1.875 10 1.875ZM3.125 10C3.125 6.20304 6.20304 3.125 10 3.125C13.797 3.125 16.875 6.20304 16.875 10C16.875 13.797 13.797 16.875 10 16.875C6.20304 16.875 3.125 13.797 3.125 10Z" fill="#28A745"/>
            </svg>
            <svg id="momo-id-step2_error" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125ZM1.875 10C1.875 5.51269 5.51269 1.875 10 1.875C14.4873 1.875 18.125 5.51269 18.125 10C18.125 14.4873 14.4873 18.125 10 18.125C5.51269 18.125 1.875 14.4873 1.875 10ZM7.20108 7.20103C7.44516 6.95696 7.84089 6.95696 8.08497 7.20103L10 9.11611L11.9151 7.20103C12.1592 6.95696 12.5549 6.95696 12.799 7.20103C13.0431 7.44511 13.0431 7.84084 12.799 8.08492L10.8839 10L12.799 11.9151C13.0431 12.1592 13.0431 12.5549 12.799 12.799C12.5549 13.043 12.1592 13.043 11.9151 12.799L10 10.8839L8.08497 12.799C7.84089 13.043 7.44516 13.043 7.20108 12.799C6.95701 12.5549 6.95701 12.1592 7.20108 11.9151L9.11616 10L7.20108 8.08492C6.95701 7.84084 6.95701 7.44511 7.20108 7.20103Z" fill="#DC3545"/>
            </svg>
          </span>
          <span style="display: inline-block;">請登入競品後台，打開商品列表或者商品詳情頁面+後台</span>
        </div>
      </div>

      <div style="display: flex; justify-content: center;">
        <button id="momo-id-tips-close" class="momo-button momo-button-color-2" style="width: 88px;">我知道了</button>
      </div>

      <span style="position: absolute; right: -8px; top: 120px;">${momoIcon.arrow}</span>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  const closeBt = document.getElementById('momo-id-tips-close')
  closeBt.onclick = () => {
    const disabledFloatDom = document.getElementById('momo-id-disabled-float')
    disabledFloatDom.classList.add('momo-hidden')
  }
  
}

aimWeb.init()
collectFloat()
singleCollectTip()
batchCollectTip1()
batchCollectTip2()
disabledFloat()

// 接收消息
chrome.runtime.onMessage.addListener((res, sender, sendRes) => {
  const disabledFloatDom = document.getElementById('momo-id-disabled-float')
  disabledFloatDom && disabledFloatDom.classList.add('momo-hidden')
  switchTip('momo-id-single-collect-tip', 'momo-single-collect-tip', 'hidden')
  switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'hidden')
  switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'hidden')
  
  const collectFoldFloatDom = document.getElementById('momo-id-fold-float')
  const step1SuccessDom = document.getElementById('momo-id-step1_success')
  const step1ErrorDom = document.getElementById('momo-id-step1_error')
  const step2SuccessDom = document.getElementById('momo-id-step2_success')
  const step2ErrorDom = document.getElementById('momo-id-step2_error')
  const floatContentDom = document.getElementById('momo-id-float-content')
  const foldBt = document.getElementById('momo-id-fold-float')
  switch(res.type) {
    // 页面是否可用
    case 'urlChange':
      let usedPage = false
      for (const i of aimWeb.pages) {
        if(res.url.match(i.path)){
          usedPage = true
          aimWeb.curPage = i
          break
        }
      }
      const collectFloatDom = document.getElementById('momo-id-collect-float')
      if (usedPage) {
        // collectFloatDom && collectFloatDom.classList.remove('momo-hidden')
        step2SuccessDom && step2SuccessDom.classList.remove('momo-hidden')
        step2ErrorDom && step2ErrorDom.classList.add('momo-hidden')
        if (step1ErrorDom.classList.contains('momo-hidden')) {
          collectFoldFloatDom && collectFoldFloatDom.classList.remove('momo-disabled')
        }
      } else {
        // collectFloatDom && collectFloatDom.classList.add('momo-hidden')
        floatContentDom && floatContentDom.classList.remove('momo-unfold-content')
        foldBt && foldBt.classList.remove('momo-unfold')
        collectFoldFloatDom && collectFoldFloatDom.classList.add('momo-disabled')
        step2SuccessDom && step2SuccessDom.classList.add('momo-hidden')
        step2ErrorDom && step2ErrorDom.classList.remove('momo-hidden')
      }
      break
    // 是否登录
    case 'loginStatus':
      if (res.status) {
        step1SuccessDom && step1SuccessDom.classList.remove('momo-hidden')
        step1ErrorDom && step1ErrorDom.classList.add('momo-hidden')
        if (step2ErrorDom.classList.contains('momo-hidden')) {
          collectFoldFloatDom && collectFoldFloatDom.classList.remove('momo-disabled')
        }
      } else {
        floatContentDom && floatContentDom.classList.remove('momo-unfold-content')
        foldBt && foldBt.classList.remove('momo-unfold')
        collectFoldFloatDom && collectFoldFloatDom.classList.add('momo-disabled')
        step1SuccessDom && step1SuccessDom.classList.add('momo-hidden')
        step1ErrorDom && step1ErrorDom.classList.remove('momo-hidden')
      }
      break
    default:
      console.warn('=====不能处理此消息=====', res)
  }
})