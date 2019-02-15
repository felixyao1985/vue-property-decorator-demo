/** 2018/10/11
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能: 常见问题 管理
 */

import {axios,http,HttpHost} from './Ajax'

//获取列表
async function getList() {
  return new Promise((resolve, reject) => {
    axios.get('api/lovePlems/listLoveProblems').then(res => {
      let {code, data} = res.data;
      if (code === 0) {
        resolve(data.loveProblemsList)
      }
      reject('error')
    })
  })
}

//保存和更新
async function saveAndUpdate(option) {
  let lastUrl=option.id?'updateLoveProblems':'saveLoveProblems';
  return new Promise((resolve, reject) => {
    // http.post(`api/lovePlems/${lastUrl}`,option,'json').then(res => {
    //   let {code, data} = res.data;
    //   if (code === 0) {
    //     resolve(data.loveProblemsList)
    //   }
    //   reject('error')
    // })
    $.ajax({
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(option),
      url: `${HttpHost}iweb/api/lovePlems/${lastUrl}`,
      success: function (data) {
        if (data.msg == "SUCCESS") {
          resolve('保存成功')
        }
      }
    });

  })
}

//获取列表
async function deleteById(loveProblemsId) {
  return new Promise((resolve, reject) => {
    http.post('api/lovePlems/deleteLoveProblems',{params:{loveProblemsId}}).then(res => {
      let {code} = res.data;
      if (code === 0) {
        resolve(ok)
      }
      reject('error')
    })
  })
}

export default {
  getList,
  saveAndUpdate,
  deleteById
}
