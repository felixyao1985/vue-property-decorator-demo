/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'


// 获取爱记忆提问列表
async function QuestionList() {
  return new Promise((resolve, reject) => {
    http.get('iweb/loveQuestion/listLoveQuestion').then(res => {
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

// view问题
async function getQuestion(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/loveQuestion/jumpEditLoveQuestion',{questionId:id}).then(res => {
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

// 改变状态
async function changeQuestionState(parms) {
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

// 发送回复
async function sendLoveQuestion(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/loveQuestion/saveLoveQuestion',parms).then(res => {
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
async function delReply(parms) {
  return new Promise((resolve, reject) => {
    http.get('iweb/loveQuestion/deleteReply',parms).then(res => {
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
  QuestionList,
  getQuestion,
  changeQuestionState,
  sendLoveQuestion,
  delReply
}
