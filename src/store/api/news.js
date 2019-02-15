/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'


// 获取文章列表
async function ArticleList() {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwArticle/list').then(res => {
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
async function delArticle(parms) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwArticle/delArticleById',parms).then(res => {
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
async function getArticle(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/gwArticle/jumpEditAriticle',{id:id}).then(res => {
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
async function postArticle(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/gwArticle/add',parms).then(res => {
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
async function putArticle(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/gwArticle/updateArticleById',parms).then(res => {
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

// 保存
async function saveArticle(parms) {
  if (parms.id > 0) {
    return putArticle(parms);
  } else {
    return postArticle(parms);
  }
}

export default{
  ArticleList,
  delArticle,
  getArticle,
  saveArticle,
}
