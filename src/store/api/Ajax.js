/*
 * @Author zhanglibing
 * @CreateTime 2017 / 5 /16
 * @Version 1.0
 * @Since 1.0
 * @description 数据接口
 */

/*
 自己写的AJAX
 */
//格式化参数

import axios from 'axios'
import qs from 'qs'

// const HttpHost='http://10.100.10.22:8082/';  //本机
const HttpHost='https://ceshi.icloudcare.com/';  //测试环境
// const HttpHost='https://admin.izhaohu.com/';     //正式环境

//全局变量
axios.defaults.baseURL = `${HttpHost}iweb/`;
axios.defaults.timeout = 200000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  alert("错误的传参");
  return Promise.reject(error);
});

function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  //arr.push(("v=" + Math.random()).replace(".",""));
  return arr.join("&");
}
function ajax(options={}) {
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";

  if (options.ContentType == null || options.ContentType == undefined) {
    options.ContentType = options.ContentType || "urlencoded";
  } else {
    options.ContentType = options.ContentType;
  }

  if (options.ContentType == 'json') {
    var ContentType = "application/json; charset=utf-8";
    var params = options.data;
  } else if (options.ContentType == 'formdata') {
    var ContentType = "multipart/form-data; charset=utf-8";
    var params = options.data;
  } else if (options.ContentType === false) {
    var ContentType = false;
    var params = options.data;
  } else {
    var ContentType = "application/x-www-form-urlencoded";
    var params = formatParams(options.data);
  }

  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.withCredentials = false;
  } else if (XDomainRequest != undefined) {
    xhr = new XDomainRequest();
    xhr.withCredentials = false;
  } else {

  }

  //接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 500) {
        if (options.dataType == 'json') {
          var responseText = JSON.parse(xhr.responseText);
        } else {
          var responseText = xhr.responseText;
        }
        options.success && options.success(responseText, xhr.responseXML);
      } else {
        options.error && options.error(status);
      }
    }
  }

  //连接 和 发送 - 第二步
  if (options.type == "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("POST", options.url, true);
    //设置表单提交时的内容类型

    if (ContentType) {
      xhr.setRequestHeader("Content-Type", ContentType);
    }
    xhr.send(params);
  }
}



function _ajax(url, data={}, ContentType, type = 'POST', headers={},allUrl='') { //allUrl : 其他host 非统一接口host
  if(ContentType==null||ContentType==undefined) {
    var ContentType = ContentType || "urlencoded";
  }else{
    var ContentType = ContentType;
  }
  return new Promise((resolve, reject) => {
    ajax({
      url:allUrl?allUrl: HttpHost + url,              //请求地址
      type: type,                       //请求方式
      data: data,        //请求参数
      dataType: "json",//请求参数
      ContentType: ContentType,
      success: function (response, xml) {
        resolve(response);
      },
      error: function (status) {
        reject(status);
      }
    });
  })
}

/*
 * @description 字符串编码
 * @pram
 jsonobj JSON对象
 */
var encode = function (jsonobj) {
  return encodeURI(JSON.stringify(jsonobj))
}


function post(url, data,ContentType='json') {
  if(ContentType=='json'){
    data= JSON.stringify(data)
  }
  return new Promise((resolve, reject) => {
    _ajax(url, data, ContentType, 'POST', ).then(res => {
      let {code,data}=res;
      if(code==0){
        resolve(res)
      }else{
        reject(res)
      }
    }).catch(res => {
      reject(res)
    })
  })
}

function get(url, data,ContentType='',isAllUrl=false) { //isAllUrl :是否接口host
  return new Promise((resolve, reject) => {
    let allUrl=isAllUrl?url:''
    _ajax(url, data, ContentType, 'GET', {},allUrl).then(res => {
      let {code,data}=res;
      if(code==0){
        resolve(res)
      }else{
        reject(res)
      }
    }).catch(res => {
      reject(res)
    })
  })
}







let http = {
  post: post,
  get: get,
  axios:axios
}


export{
  http,
  encode,
  _ajax,
  axios,
  HttpHost
}




