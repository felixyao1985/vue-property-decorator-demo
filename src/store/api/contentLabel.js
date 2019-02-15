/** 2018/10/12
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
import {axios, http} from './Ajax'

//获取列表
async function getList(type=false) {  //是否过滤未启用的
  return new Promise((resolve, reject) => {
    axios.get('gwTab/tabList').then(res => {
      let {code, data} = res.data;
      if (code === 0) {
        if(type){
          let a=data.filter(val=>!val.usedFlag)
          resolve(a)
        }
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

//获取预约管理列表
async function saveAndUpdate(option) {
  let lastUrl = option.id ? 'updateTabById' : 'addTab';
  return new Promise((resolve, reject) => {
    http.post(`/iweb/gwTab/${lastUrl}`, option).then(res => {
      let {code} = res;
      if (code === 0) {
        resolve('success')
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

//刪除
async function deleteById(id) {
  return new Promise((resolve, reject) => {
    axios.get('gwTab/delTabById', {params:{id}}).then(res => {
      let {code} = res.data;
      if (code === 0) {
        resolve('success')
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

export default {
  getList,
  saveAndUpdate
}

export {
  getList,
  saveAndUpdate,
  deleteById
}
