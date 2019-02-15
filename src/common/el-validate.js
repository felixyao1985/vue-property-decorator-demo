/**
 * Created by felix on 2018/9/21.
 */
/*
 * 表单验证
 * */

//经纬度验证
let validateX = (rule, value, callback)=>{
  if(value !=undefined || value=='')callback();
  let latreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
  if (!latreg.test(value)) {

    callback(new Error());
  } else {
    callback();
  }
}

let validateY = (rule, value, callback)=>{
  if(value ==undefined || value=='')callback();
  let latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
  if (!latreg.test(value)) {

    callback(new Error());
  } else {
    callback();
  }
}

//联络电话验证
let validatePhone = (rule, value, callback)=>{
  if (value !=undefined && value.length > 0) {
    let firstTel = value.substring(0, 1);
    if (firstTel == 1) {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error("手机号码有误，请重填"));
      }
    } else {
      if (!/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)) {
        callback(new Error("这不是正确的电话号码，请重填"));
      }
    }
  }
  callback();
}

//空格验证
let validateSpace = (rule, value, callback)=> {

  if (value !=undefined && value.length > 0) {
    var regular = /\s+/g;
    if (regular.test(value)) {
      callback(new Error());
    }
  }
  callback();
}

//时间选单验证
let validateDatetimeRange = (rule, value, callback)=> {
  console.log(value)
  if(value==undefined || value.length !=2 || value[0]== '' || value[1]== ''){
    callback(new Error("请选择时间"));
  }
  callback();
}


export {
  validateX,
  validateY,
  validatePhone,
  validateSpace,
  validateDatetimeRange
}

