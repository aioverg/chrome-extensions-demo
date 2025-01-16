class MoMoDBStorage {
  static db = null
  constructor(storageName = aimWeb.dbStorageName || "MoMoCollectDatabase", tableNames = aimWeb.dbTableNames || ['product']){
    const request = indexedDB.open(storageName);
    request.onerror = (res) => {
      console.warn('=====MoMoDBStorage 仓库打开失败=====', res)
    }
    request.onsuccess = e => {
      this.db = e.target.result
    }
  
    request.onupgradeneeded = function (e) {
      const db = e.target.result;

      for (const i of tableNames) {
        const objectStore = db.createObjectStore(i, { keyPath: 'id', autoIncrement: false });
        objectStore.createIndex('value', 'value', { unique: false });
      }
    };
  }
  // 增加数据
  add(val) {
    this.db.transaction([aimWeb.curPage.dbTableName], 'readwrite').objectStore(aimWeb.curPage.dbTableName).add(val)
  }
  // 插入或覆盖数据
  put(val) {
    this.db.transaction([aimWeb.curPage.dbTableName], 'readwrite').objectStore(aimWeb.curPage.dbTableName).put(val)
  }
  // 删除数据
  delete(id) {
    this.db.transaction([aimWeb.curPage.dbTableName]).objectStore(aimWeb.curPage.dbTableName).delete(id)
  }
  // 获取全部数据
  getAll() {
    return this.db.transaction([aimWeb.curPage.dbTableName]).objectStore(aimWeb.curPage.dbTableName).getAll()
  }
  // 更新是否导入字段
  update(ids, isImport, callback) {
    const result = []
    const objectStore = this.db.transaction([aimWeb.curPage.dbTableName], 'readwrite').objectStore(aimWeb.curPage.dbTableName)
    for (const id of ids) {
      const request = objectStore.get(id)
      request.onsuccess = event => {
        const data = event.target.result
        data.value.__affix__.isImport = isImport
  
        const requestUpdate = objectStore.put(data)
        requestUpdate.onsuccess = () => {
          result.push(id)
          if (result.length === ids.length) {
            callback && callback(result)
          }
        };
      }
      request.onerror = () => {
        result.push(id)
        if (result.length === ids.length) {
          callback && callback(result)
        }
      }
    }
  }
}