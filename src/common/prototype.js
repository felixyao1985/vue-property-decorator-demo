import Vue from 'vue'
import {http,HttpHost} from '../store/api/Ajax'

function initPrototype() {
  //全局title
  Vue.directive('title', {
    inserted: (el, binding) => {
      document.title = '爱照护-' + el.innerText;

    },
    update: (el, binding) => {//组件更新后重新赋值
      document.title = '爱照护-' + el.innerText;
    },
  })

  //字符串截取  超出隐藏兼容
  Vue.filter('stringSlice', (value, length = 17) => {
    if (value.length > length) {
      return value.slice(0, length) + '...';
    }
    return value;
  })

  //反馈状态描述
  Vue.filter('feedbackStateToText', (value) => {
    let orderType = {
      0: '已投诉待确认',
      1: '已确认待处理',
      2: '已处理',
      3: '待评价',
      4: '完成',
      5: '已关闭'
    };
    return orderType[value];
  })

  //发布状态描述
  Vue.filter('releaseFlagToText', (value) => {
    let orderType = {
      0: '已经发布',
      1: '未发布',
    };
    return orderType[value];
  })

  //运行状态
  Vue.filter('stateToText', (value) => {
    let orderType = {
      0: '进行中',
      1: '已结束',
    };
    return orderType[value];
  })

  //反馈状态描述
  Vue.filter('feedbackTypeToText', (value) => {
    let typeName = { 0: '智能设备反馈',1: '新用户心愿',2: '优化建议',  3: '其他' ,4: '服务投诉'}
    return typeName[value];
  })

  //活动报名状态
  Vue.filter('enrollStatusToText', (value) => {
    let orderType = {
      0: '未通过',
      1: '通过',
    };
    return orderType[value];
  })

  //格式化输出时间
  Vue.filter('timeFilter', (value) => {

    if(!value)return '';
    let date = new Date(value);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    M = M < 10 ? '0' + M : M;
    // D = D < 10 ? '0' + D : D;
    // let h = date.getHours() + ':';
    // let m = date.getMinutes() + ':';
    // let s = date.getSeconds();
    D = (D < 10) ? ("0" + D) : D;
    return  `${Y}-${M}-${D}` ;
  })

  Vue.prototype.http = http;  //挂载自己写的ajax
  Vue.prototype.HttpHost = HttpHost;  //挂载自己写的ajax
}

export {
  initPrototype
}
