// 批量采集注入标识
var injectTarget = {
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
function collectResultDialog(val = {type: 'collectFailed', num: 0, message}) {
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
      contentText: `部分商品採集成功，本次成功探集 <span style="color: #5A72DB;">${val.num}</span> 個商品，可到「插件-採集商品庫」中查看已採集商品`,
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
      contentText: val.message || '系统異常，商品導入失敗，請重新導入',
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
              collectResultDialog({type: 'importFailed', message: res.message})
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

      <div id="momo-id-fold-float">
        <span id="momo-id-fold-float-icon1">${momoIcon.brand}</span>
        <span id="momo-id-fold-float-icon2" class="momo-hidden">${momoIcon.brandGray}</span>
      </div>
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
    <div id="momo-id-disabled-float" class="momo-hidden" style="z-index: 9999; width: 340px; padding: 24px 16px; position: fixed; top: 310px; right: 85px; background: #fff; border-radius: 8px; box-shadow: 0px 138px 184px 0px rgba(0, 0, 0, 0.03), 0px 57.653px 76.871px 0px rgba(0, 0, 0, 0.02), 0px 30.824px 41.099px 0px rgba(0, 0, 0, 0.02), 0px 17.28px 23.04px 0px rgba(0, 0, 0, 0.01), 0px 9.177px 12.236px 0px rgba(0, 0, 0, 0.01), 0px 3.819px 5.092px 0px rgba(0, 0, 0, 0.01); ">
      <div style="display: flex; align-items: center; padding-bottom: 16px;">
        <svg width="57" height="24" viewBox="0 0 57 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="56.5056" height="24" fill="url(#pattern0_11294_3796)"/>
          <defs>
          <pattern id="pattern0_11294_3796" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#image0_11294_3796" transform="matrix(0.000479386 0 0 0.00112867 -0.0143816 -0.027088)"/>
          </pattern>
          <image id="image0_11294_3796" width="2127" height="931" xlink:href="data:image/png;base64,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"/>
          </defs>
        </svg>          
        <span style="font-size: 16px; line-height: 20px; margin-left: 7px; font-weight: bold;">小助手</span>
      </div>

      <div style="font-size: 14px; line-height: 20px;">
        <div style="color: #364480; margin-bottom: 4px; font-weight: bold; font-size: 15px;">歡迎使用搬家小助手</div>
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
  const foldBtIcon1 =  document.getElementById('momo-id-fold-float-icon1')
  const foldBtIcon2 =  document.getElementById('momo-id-fold-float-icon2')
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
      if (usedPage) {
        step2SuccessDom && step2SuccessDom.classList.remove('momo-hidden')
        step2ErrorDom && step2ErrorDom.classList.add('momo-hidden')
        if (step1ErrorDom.classList.contains('momo-hidden')) {
          foldBt && foldBt.classList.remove('momo-disabled')
          foldBtIcon1 && foldBtIcon1.classList.remove('momo-hidden')
          foldBtIcon2 && foldBtIcon2.classList.add('momo-hidden')
        }
      } else {
        floatContentDom && floatContentDom.classList.remove('momo-unfold-content')
        foldBt && foldBt.classList.remove('momo-unfold')
        foldBt && foldBt.classList.add('momo-disabled')
        foldBtIcon1 && foldBtIcon1.classList.add('momo-hidden')
        foldBtIcon2 && foldBtIcon2.classList.remove('momo-hidden')
      }
      break
    // 是否登录
    case 'loginStatus':
      if (res.status) {
        step1SuccessDom && step1SuccessDom.classList.remove('momo-hidden')
        step1ErrorDom && step1ErrorDom.classList.add('momo-hidden')
        if (step2ErrorDom.classList.contains('momo-hidden')) {
          foldBt && foldBt.classList.remove('momo-disabled')
          foldBtIcon1 && foldBtIcon1.classList.remove('momo-hidden')
          foldBtIcon2 && foldBtIcon2.classList.add('momo-hidden')
        }
      } else {
        floatContentDom && floatContentDom.classList.remove('momo-unfold-content')
        foldBt && foldBt.classList.remove('momo-unfold')
        foldBt && foldBt.classList.add('momo-disabled')
        foldBtIcon1 && foldBtIcon1.classList.add('momo-hidden')
        foldBtIcon2 && foldBtIcon2.classList.remove('momo-hidden')
      }
      break
    default:
      console.warn('=====不能处理此消息=====', res)
  }
})