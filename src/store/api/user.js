/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'


// 获取用户列表
async function UserList(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/sys/user/getListUser',parms).then(res => {
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


// view用户
async function getUserInfo(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/sys/user/info/'+id).then(res => {
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

// 编辑用户
async function putUserInfo(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/sys/user/update',parms).then(res => {
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

// 修改密码
async function changePWD(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/sys/user/updatePwd',parms).then(res => {
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
// 保存用户
async function saveUserInfo(parms) {
  if(parms.id > 0){
    return putUserInfo(parms);
  }else{
    return 0;
  }
}
export default{
  UserList,
  getUserInfo,
  saveUserInfo,
  changePWD
}
