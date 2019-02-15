/** 2018/10/12
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
import {axios,http,HttpHost} from './Ajax'

// 获取机构标签列表
async function TagList() {
  return new Promise((resolve, reject) => {
    http.get('iweb/domain/listDomainTag').then(res => {
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

// 获取机构标签父标签列表
async function TagFirstList() {
  return new Promise((resolve, reject) => {
    http.get('iweb/domain/listFirstDomainTags').then(res => {
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

// 获取机构标签父标签列表
async function postTag(params) {
  return new Promise((resolve, reject) => {
    http.post('iweb/domain/saveDomainTagSecond',params).then(res => {
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

// 获取门店列表
async function getDomainList(parms) {
  return new Promise((resolve, reject) => {
    axios.get('domain/list').then(res => {
      let {code, data} = res.data;
      if (code == 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 删除门店
async function deleteDomain(option) {
  return new Promise((resolve, reject) => {
    axios.get('domain/usingDomain',{params:option}).then(res => {
      let {code} = res.data;
      if (code == 0) {
        resolve('ok')
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 获取门店详情
async function getDomainDetails(id) {
  return new Promise((resolve, reject) => {
    axios.get('domain/getEditDomain',{params:{id}}).then(res => {
      let {code,data} = res.data;
      if (code == 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 保存门店  \跟新
async function saveDomain(params) {
  let lastUrl=params.id?'updateDomain':'saveDomain';
  return new Promise((resolve, reject) => {
    // axios.post('domain/saveDomain',params,{headers:{'Content-Type':'application/json;charset=utf-8'}}).then(res => {
    //   let {code} = res.data;
    //   if (code == 0) {
    //     resolve('ok')
    //   }
    //   reject('error')
    // }).catch(res => {
    //   reject('error')
    // })
    $.ajax({
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(params),
      url: `${HttpHost}iweb/domain/${lastUrl}`,
      success: function (data) {
        if (data.code == 500005) {
          resolve('门店已存在')
          return;
        }
        if (data.msg == "SUCCESS") {
          resolve('保存成功')
          setTimeout(function () {

          }, 1000);
        } else {

        }
      }
    });
  })
}

// 获取省列表
async function getProvince() {
  return new Promise((resolve, reject) => {
    axios.post('/domain/provinceAllList').then(res => {
      let {code,data} = res.data;
      if (code == 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}
// 获取市列表
async function getCityById(province_id) {
  return new Promise((resolve, reject) => {
    axios.post(`/domain/cityAllList?province_id=${province_id}`).then(res => {
      let {code,data} = res.data;
      if (code == 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

//获取区劣列表
async function getAreaById(city_id) {
  return new Promise((resolve, reject) => {
    axios.post(`/domain/areaAllList?city_id=${city_id}`).then(res => {
      let {code,data} = res.data;
      if (code == 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

export default{
  TagList,
  TagFirstList,
  postTag,
  getDomainList,
  deleteDomain,
  getProvince,
  getCityById,
  getAreaById,
  saveDomain,
  getDomainDetails
}
