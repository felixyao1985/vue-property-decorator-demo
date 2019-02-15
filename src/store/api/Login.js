/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'



// 改变状态
async function Login(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/loveQuestion/updateLoveQuestionState?questionId='+parms.questionId+'&replyState='+parms.replyState,{}).then(res => {
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
  Login
}
