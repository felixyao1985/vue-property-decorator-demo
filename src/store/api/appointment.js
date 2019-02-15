import {axios, http} from './Ajax'

//获取预约管理列表
async function getList() {
  return new Promise((resolve, reject) => {
    axios.get('appointment/list').then(res => {
      let {code, data} = res.data;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

//删除预约
async function DeleteById(id) {
  return new Promise((resolve, reject) => {
    axios.get(`appointment/deleteAppointmentById?id=${id}`).then(res => {
      let {code, data} = res.data;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

//修改预约  （暂时只保存随笔记录）
async function saveRemark(option) {
  return new Promise((resolve, reject) => {
    http.post('iweb/appointment/saveRemark', option).then(res => {
      let {code} = res;
      if (code === 0) {
        resolve('ok')
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

export default {
  getList,
  DeleteById,
  saveRemark
}
