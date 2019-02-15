/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'


// 获取话题列表
async function TopicList() {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwTopic/topicList').then(res => {
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
async function delTopic(parms) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwTopic/delete',parms).then(res => {
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

// view文章
async function getTopic(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwTopic/jumpEditTopic',{id:id}).then(res => {
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

// 新增
async function postTopic(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/gwTopic/saveTopic',parms).then(res => {
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

// 编辑
async function putTopic(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/gwTopic/updateTopics',parms).then(res => {
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

// 获取表单选项数据
async function getDefaultFormData() {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwTopic/jumpNewModelTopic').then(res => {
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

// 保存
async function saveTopic(parms) {
  if (parms.id > 0) {
    return putTopic(parms);
  } else {
    return postTopic(parms);
  }
}

export default{
  TopicList,
  delTopic,
  getTopic,
  saveTopic,
  getDefaultFormData,
}
