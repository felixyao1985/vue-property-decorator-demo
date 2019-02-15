// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/common.css'
import store from './store'

import {globalColor} from './common/constant'

import $ from 'jquery'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$globalColor = globalColor


import {initPrototype} from '@/common/prototype.js'
initPrototype()

//全局title
Vue.directive('title', {
  inserted: (el, binding) => {
    document.title = '爱照护-' + el.innerText;
    el.style.display = 'none';
  },
  update: (el, binding) => {//组件更新后重新赋值
    document.title = '爱照护-' + el.innerText;
  },
})


router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.matched.some(m => !m.meta.auth)) {// 对路由进行验证
    if (store.state.Login.UserInfo||1) { // 已经登陆
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
