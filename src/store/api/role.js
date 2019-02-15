import {http} from './Ajax'

// 获取官网用户角色信息
async function UserRoleList(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/sys/menurole/getRoleInfo',parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(res)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 设定角色权限
async function saveMenu(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/sys/menurole/saveMenu',parms,'json').then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(res)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}
// view角色权限
async function getMenuByRole(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/sys/menurole/getMenuByRole/'+id).then(res => {
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

export default{
  UserRoleList,
  saveMenu,
  getMenuByRole
}
