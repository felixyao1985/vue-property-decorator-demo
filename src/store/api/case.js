/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'


// 获取案例列表
async function CaseList() {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwCase/list').then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 删除回复
async function delCase(parms) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwCase/delCaseById',parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// view案例
async function getCase(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwCase/jumpEditGwCase',{id:id}).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 新增
async function postCase(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/gwCase/add',parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 编辑
async function putCase(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/gwCase/updateCaseById',parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 保存
async function saveCase(parms) {
  if (parms.id > 0) {
    return putCase(parms);
  } else {
    return postCase(parms);
  }
}

export default{
  CaseList,
  delCase,
  getCase,
  saveCase,
}
