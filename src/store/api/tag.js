/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'


// 获取爱记忆提问列表
async function GWTabList() {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwTab/list').then(res => {
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
  GWTabList,
}
