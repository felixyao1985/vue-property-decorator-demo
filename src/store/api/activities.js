/*
 *爱记忆相关接口
 * */
import {axios,http} from './Ajax'


// 获取标签
async function getTag(parms) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwActivities/addNewModelTopic',parms).then(res => {
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

// 获取活动列表
async function ActivitiesList(status) {
  return new Promise((resolve, reject) => {
    http.post('iweb/gwActivities/list?status='+status).then(res => {
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
async function delActivities(id) {
  return new Promise((resolve, reject) => {
    http.post(`iweb/gwActivities/delete?id=${id}`).then(res => {
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

// view活动
async function getActivities(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwActivities/editActivity',{id:id}).then(res => {
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

//获取报名列表
async function getEnrollList(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwEnroll/detailOfActivity',{id:id}).then(res => {
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

//获取报名列表
async function changeEnrollStatus(parms) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwEnroll/auditingGwEnroll',parms).then(res => {
      resolve(0);
    }).catch(res => {
      resolve(0);
    })
  })
}

//发送短信验证码
async function sendMessage(id) {
  return new Promise((resolve, reject) => {
    axios.post(`iweb/gwEnroll/sendMessage?id=${id}`).then(res => {
      let {code}=res.data;
      if(code==0){
        resolve('ok');
      }
      reject('error')
    }).catch(res => {
      resolve(0);
    })
  })
}

// 保存 \ 编辑
async function saveActivities(parms) {
  let lastUrl=parms.id?'updateActivities':'saveActivities';
  return new Promise((resolve, reject) => {
    http.post(`iweb/gwActivities/${lastUrl}`,parms).then(res => {
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
  getTag,
  ActivitiesList,
  delActivities,
  getActivities,
  saveActivities,
  getEnrollList,
  changeEnrollStatus,
  sendMessage,
}
