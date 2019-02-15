import {axios, http} from './Ajax'
import md5 from 'js-md5';
import store from '../index'

// 获取图片验证码
async function getImgCode() {
  return new Promise((resolve, reject) => {
    axios.get(`/api/sms/sms/captcha`).then(res => {
      resolve(res.data.data)
    }).catch(res => {
      reject(res)
    })
  })

}

// 登录
async function login(params) {
  params.password = md5(params.password);
  return new Promise((resolve, reject) => {
    axios.post('ajaxLogin', params).then(res => {
      let {code, data, msg} = res.data;
      if (code === 0) {
        resolve(data);
      } else {
        reject(msg)
      }
    })
  })
}


// 获取权限
async function getPermissions() {
  // iweb/?userid=5921
  return new Promise((resolve, reject) => {
    axios.get('sys/menu/listNav', {params: {userid: store.state.Login.UserInfo.id}}).then(res => {
      let {code, data} = res.data;
      if (code === 0) {
        store.commit('SET_Permissions',data)
        resolve('ok');
      } else {
        reject(msg)
      }
    })
  })
}


export {
  getImgCode,
  login,
  getPermissions
}
