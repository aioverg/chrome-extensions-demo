var aimApi = {
  // shopee 全球商品详情接口 - mtsku
  shopeeDetails: async (params) => {
    const response = await fetch(`${aimWebs.shopee.domain}/api/v3/mtsku/get_mtsku_info/?${params}`,{ method: 'get' })
    const resData = await response.json()
    const __affix__ = {
      id: resData.data.mtsku_item_id,
      name: resData.data.name,
      price: [0, 0],
      stock: 0,
    }
    for (const i of resData.data.model_list) {
      __affix__.stock += i.stock_detail.total_available_stock
      if (+i.price_info.normal_price == 0 ) {
        continue
      }
      if (__affix__.price[0] === 0 || __affix__.price[0] === +i.price_info.normal_price) {
        __affix__.price[0] = +i.price_info.normal_price
        continue
      }
      if (__affix__.price[0] > +i.price_info.normal_price) {
        __affix__.price = [+i.price_info.normal_price, __affix__.price[0]]
      } else {
        __affix__.price = [__affix__.price[0], +i.price_info.normal_price]
      }
    }
    return Promise.resolve({__affix__, ...resData})
  },
  // shopee 根据 mtsku 获取 mpsku
  mpskuByMtsku: async (params) => {
    const response = await fetch(`${aimWebs.shopee.domain}/api/v3/mtsku/get_mpsku_price_by_mtsku/?${params}`,{ method: 'get' })
    const resData = await response.json()
  },

  // shopee 店铺商品详情接口 - mpsku
  productDetails: async (params) => {
    const response = await fetch(`${aimWebs.shopee.domain}/api/v3/product/get_product_info?${params}`,{ method: 'get' })
    const resData = await response.json()
    const __affix__ = {
      id: resData.data.product_info.id,
      name: resData.data.product_info.name,
      price: [0, 0],
      stock: 0,
    }
    for (const i of resData.data.product_info.model_list) {
      __affix__.stock += i.stock_detail.total_available_stock
      if (+i.price_info.input_normal_price == 0 ) {
        continue
      }
      if (__affix__.price[0] === 0 || __affix__.price[0] === +i.price_info.input_normal_price) {
        __affix__.price[0] = +i.price_info.input_normal_price
        continue
      }
      if (__affix__.price[0] > +i.price_info.input_normal_price) {
        __affix__.price = [+i.price_info.input_normal_price, __affix__.price[0]]
      } else {
        __affix__.price = [__affix__.price[0], +i.price_info.input_normal_price]
      }
    }
    return Promise.resolve({__affix__, ...resData})
  },
  // shopee 根据 mpsku 获取 mtsku
  mtskuByMpsku: async (params) => {
    const response = await fetch(`${aimWebs.shopee.domain}/api/v3/mtsku/get_mtsku_id_by_mpsku/?${params}`,{ method: 'get' })
    const resData = await response.json()
    return Promise.resolve(resData.data.mtsku_id)
  }
}

var aimWeb = {
  name: 'shopee',
  href: aimWebs.shopee.domain,
  curPage: undefined,
  db: undefined,
  dbStorageName: 'MoMoCollectDatabase', // 仓库名称
  dbTableNames: ['product'],
  pages: [ // 采集页面列表
    { // shopee 全球商品列表
      path: aimWebs.shopee.pages.mtskuList,
      targetId: 'mtsku-list',
      type: 'batch',
      dbTableName: 'product',
      getData: async () => {
        const params = []
        const SPC_CDS = document.cookie.match(/SPC_CDS=.*?;/)[0].replace(';', '')
        let cnsc_shop_id = null
        try {
          cnsc_shop_id = window.location.href.match(/cnsc_shop_id=[0-9]+/)[0]
        }catch(err) {
          console.warn('没有 cnsc_shop_id')
        }
        const tableDom = document.getElementsByClassName(injectTarget.tableClass)[0]
        if (!tableDom) { return { type: 'noInjectDom' } }
        const checkBoxDom = tableDom.getElementsByClassName(injectTarget.checkboxClass)
        if (!checkBoxDom.length) { return { type: 'noInjectDom' } }
        for (const i of checkBoxDom) {
          if (i.checked) {
            params.push(`${SPC_CDS}&SPC_CDS_VER=2&mtsku_item_id=${i.dataset.id}${cnsc_shop_id ? '&' + cnsc_shop_id: ''}&cbsc_shop_region=my`)
          }
        }
        if (!params.length) { return { type: 'noChecked' } }

        const promiseList = []
        for (const i of params) {
          promiseList.push(aimApi.shopeeDetails(i))
        }
        const res = await Promise.all(promiseList)
        const data = []
        for (const i of res) {
          data.push({
            data: { mtSkuJson: i.data },
            __affix__: i.__affix__
          })
        }
        return Promise.resolve({ type: 'success', data: data })
      },
      injectDom: () => {
        const rootDom = document.getElementsByClassName(injectTarget.tableClass)[0]
        if (rootDom) {
          const theadDom = rootDom.getElementsByTagName('thead')[0].getElementsByTagName('th')[0]
          theadDom.insertAdjacentHTML('afterbegin', `<input type="checkbox" id="${injectTarget.allCheckboxId}" class="momo-all-checkbox" />`)
    
          const tbodyTrDoms = rootDom.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
          for (const i of tbodyTrDoms) {
            const id = i.getElementsByClassName('item-id')[0].childNodes[0].innerText.match(/[0-9]+/)
            const firstDom = i.getElementsByTagName('td')[0]
            firstDom.insertAdjacentHTML('afterbegin', `<input type="checkbox" data-id="${id? id[0] : undefined}" class="momo-checkbox ${injectTarget.checkboxClass}" />`)
          }
        }
        rootDom.addEventListener('click', injectCheckboxEvent)
      }
    },
    { // shopee 全球商品列表详情
      path: aimWebs.shopee.pages.mtskuDetails,
      type: 'single',
      dbTableName: 'product',
      getData: async () => {
        const SPC_CDS = document.cookie.match(/SPC_CDS=.*?;/)[0].replace(';', '')
        const mtsku_item_id = window.location.href.match(/[0-9]+\?/)[0].replace('?', '')
        let cnsc_shop_id = null
        try {
          cnsc_shop_id = window.location.href.match(/cnsc_shop_id=[0-9]+/)[0]
        }catch(err) {
          console.warn('没有 cnsc_shop_id')
        }
        const res = await aimApi.shopeeDetails(`${SPC_CDS}&SPC_CDS_VER=2&mtsku_item_id=${mtsku_item_id}${cnsc_shop_id ? '&' + cnsc_shop_id: ''}&cbsc_shop_region=my`)
        return Promise.resolve({
          data: { mtSkuJson: res.data },
            __affix__: res.__affix__
        })
      }
    },
    { // shopee 店铺商品列表
      path: aimWebs.shopee.pages.productList,
      targetClass: 'product-list-container',
      type: 'batch',
      dbTableName: 'product',
      getData: async () => {
        const productDetailsPromiseList = []
        const mtskuByMpskuPromiseList = []
        const SPC_CDS = document.cookie.match(/SPC_CDS=.*?;/)[0].replace(';', '')
        let cnsc_shop_id = null
        try {
          cnsc_shop_id = window.location.href.match(/cnsc_shop_id=[0-9]+/)[0]
        }catch(err) {
          console.warn('没有 cnsc_shop_id')
        }
        const tableDom = document.getElementsByClassName(injectTarget.tableClass)[0]
        if (!tableDom) { return { type: 'noInjectDom' } }
        const checkBoxDom = tableDom.getElementsByClassName(injectTarget.checkboxClass)
        if (!checkBoxDom.length) { return { type: 'noInjectDom' } }

        for (const i of checkBoxDom) {
          if (i.checked) {
            productDetailsPromiseList.push(aimApi.productDetails(`${SPC_CDS}&SPC_CDS_VER=2&product_id=${i.dataset.id}${cnsc_shop_id ? '&' + cnsc_shop_id: ''}&is_draft=false&cbsc_shop_region=my`))
            // mtskuByMpskuPromiseList.push(aimApi.mtskuByMpsku(`${SPC_CDS}&SPC_CDS_VER=2&mpsku_id=${i.dataset.id}&cnsc_shop_id=${cnsc_shop_id}&cbsc_shop_region=my`))
          }
        }

        if (!productDetailsPromiseList.length) { return { type: 'noChecked' } }

        const productDetailsRes = await Promise.all(productDetailsPromiseList)
        // const mtskuByMpskuRes = await Promise.all(mtskuByMpskuPromiseList)
        
        // const shopeeDetailsPromiseList = []
        // for (const i of mtskuByMpskuRes) {
        //   shopeeDetailsPromiseList.push(aimApi.shopeeDetails(`${SPC_CDS}&SPC_CDS_VER=2&mtsku_item_id=${i}${cnsc_shop_id ? '&' + cnsc_shop_id: ''}&cbsc_shop_region=my`))
        // }
        // const shopeeDetailsRes = await Promise.all(shopeeDetailsPromiseList)

        const data = []
        for (const i in productDetailsRes) {
          data.push({
            data: { mpSkuJson: productDetailsRes[i].data.product_info },
            // data: { mpSkuJson: productDetailsRes[i].data.product_info, mtSkuJson: shopeeDetailsRes[i].data },
            __affix__: productDetailsRes[i].__affix__
          })
        }

        return Promise.resolve({ type: 'success', data: data })

      },
      injectDom: () => {
        const rootDom = document.getElementsByClassName(injectTarget.tableClass)[0]
        if (rootDom) {
          const theadDom = rootDom.getElementsByTagName('thead')[0].getElementsByTagName('th')[0]
          theadDom.insertAdjacentHTML('afterbegin', `<input type="checkbox" id="${injectTarget.allCheckboxId}" class="momo-all-checkbox" />`)
    
          const tbodyTrDoms = rootDom.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
          for (const i of tbodyTrDoms) {
            const id = i.getElementsByClassName('item-id')[0].childNodes[0].innerText.match(/[0-9]+/)
            const firstDom = i.getElementsByTagName('td')[0]
            firstDom.insertAdjacentHTML('afterbegin', `<input type="checkbox" data-id="${id? id[0] : undefined}" class="momo-checkbox ${injectTarget.checkboxClass}" />`)
          }
        }
        rootDom.addEventListener('click', injectCheckboxEvent)
      },
    },
    { // shopee 店铺商品列表详情
      path: aimWebs.shopee.pages.productDetails,
      type: 'single',
      apiName: 'productDetails',
      dbTableName: 'product',
      getData: async () => {
        const SPC_CDS = document.cookie.match(/SPC_CDS=.*?;/)[0].replace(';', '')
        const product_id = window.location.href.match(/[0-9]+\?{0,1}/)[0].replace('?', '')
        let cnsc_shop_id = null

        try {
          cnsc_shop_id = window.location.href.match(/cnsc_shop_id=[0-9]+/)[0]
        }catch(err) {
          console.warn('没有 cnsc_shop_id')
        }

        const productDetailsRes = await aimApi.productDetails(`${SPC_CDS}&SPC_CDS_VER=2&product_id=${product_id}${cnsc_shop_id ? '&' + cnsc_shop_id: ''}is_draft=false&cbsc_shop_region=my`)
        // const mtskuByMpskuRes = await aimApi.mtskuByMpsku(`${SPC_CDS}&SPC_CDS_VER=2&mpsku_id=${product_id}&cnsc_shop_id=${cnsc_shop_id}&cbsc_shop_region=my`)
        // const shopeeDetailsRes = await aimApi.shopeeDetails(`${SPC_CDS}&SPC_CDS_VER=2&mtsku_item_id=${mtskuByMpskuRes}&cnsc_shop_id=${cnsc_shop_id}&cbsc_shop_region=my`)

        return Promise.resolve({
          data: { mpSkuJson: productDetailsRes.data.product_info },
          // data: { mpSkuJson: productDetailsRes.data.product_info, mtSkuJson: shopeeDetailsRes.data },
          __affix__: productDetailsRes.__affix__
        })
      }
    },
  ],
  init: () => {
    const href = window.location.href
    for (const i of aimWeb.pages) {
      if(href.match(i.path)) {
        aimWeb.curPage = i
        break
      }
    }
    aimWeb.db = new MoMoDBStorage()
  }
}