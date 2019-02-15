import {
  baseUrl
} from './env'

export default async(type = 'GET',url = '',data = {},headers = {},ContentType="urlencoded") => {
  type = type.toUpperCase();
  url = baseUrl + url;

  /*
   自己写的AJAX
   */
//格式化参数
  var formatParams = function (data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    //arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
  }
  var ajax  = function(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";

    if (options.ContentType == null || options.ContentType == undefined) {
      options.ContentType = options.ContentType || "urlencoded";
    } else {
      options.ContentType = options.ContentType;
    }

    if (options.type =='GET') {
      var ContentType = "application/json; charset=utf-8";
      var params = formatParams(options.data);
    } else {
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
    }




    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.withCredentials =  false;
    } else if (XDomainRequest != undefined) {
      xhr = new XDomainRequest();
      xhr.withCredentials =  false;
    } else {

    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var status = xhr.status;
        if (status >= 200 && status < 500) {
          if(options.dataType=='json')
          {
            var responseText = JSON.parse(xhr.responseText);
          }else{
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

      if(ContentType) {
        xhr.setRequestHeader("Content-Type", ContentType);
      }
      xhr.send(params);
    }
  }

  return new Promise(function(resolve, reject) {
    ajax({
      url: url,              //请求地址
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
