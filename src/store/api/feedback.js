/*
* 反馈相关接口
* */

import {axios} from './Ajax'

function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  //arr.push(("v=" + Math.random()).replace(".",""));
  return arr.join("&");
}


// 获取反馈列表
async function GetFeedbackList(params) {
  return new Promise((resolve, reject) => {
    axios.get(`api/feedBack/search?${formatParams(params)}`,null).then(res => {
      let {code, data} = res.data;
      if (code === 0) {
        resolve( res.data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

//获取反馈详情
async function getFeedbackById(id){
  return new Promise((resolve, reject) => {
    axios.post(`api/feedBack/feedbackDetail?id=${id}`).then(res => {
      let {code, data} = res.data;
      if (code === 0) {
        resolve(data) ;
      }else{
        reject('error')
      }
    })
  })
}

//获取所有门店列表
async function getDoMainList(){
  return new Promise((resolve, reject) => {
    axios.get('api/domain/getDomainsByName').then(res => {
      let {code, data} = res.data;
      if (code == 0) {
        resolve(data) ;
      }
    })
  })

}


//改变反馈状态值
async function changeStatus(option){
  return new Promise((resolve, reject) => {
    axios.post('api/feedBack/editFeedback',option).then(res => {
      let {code, msg} = res.data;
      if (code === 0) {
        resolve('ok')
      } else {
        reject('asdf ')
      }
    })
  })
}


export {
  GetFeedbackList,
  getFeedbackById,
  getDoMainList,
  changeStatus
}
