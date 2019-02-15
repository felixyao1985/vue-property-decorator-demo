import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

Vue.use(Router)


/**
 * Routers 自动打包
 * @type {VueRouter}
 */
const routerfiles = require.context('@/pages', true, /\/((?!\/)[\s\S])+\/router\.js$/)
const RouterLists = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/pages/Login.vue'], resolve),
    meta:{auth:true}
  }
];

routerfiles.keys().forEach(key => {
  RouterLists.push(routerfiles(key).default);
});
Vue.prototype.RouterLists=RouterLists;

RouterLists.push({
  path: '*',
  name: '*',
  redirect: '/404'
});

/**
 * Routers
 * @type {VueRouter}
 */
const Routers = new Router({

  /*mode: 'history',*/
  routes: RouterLists
})

/**
 * 获取头部面包屑
 *
 * @param to
 * @returns {*[]}
 */
const getBreadcrumbs = function (to) {
  let matched = to.matched
  let breadCrumbs = [
    {
      meta: {
        title: '首页'
      },
      name: 'dashboard'
    }
  ]
  if (to.name != 'dashboard') {
    for (let item of matched) {
      let o = {
        meta: item.meta,
        name: item.name
      }
      breadCrumbs.push(o)
    }
  }

  return breadCrumbs;
}

Routers.beforeEach((to, from, next) => {
  if (to.matched.length == 0) {
    next({
      name: 'error404'
    })
  }

  Store.commit('updateBreadcrumbs', getBreadcrumbs(to))
  let userInfo = Store.state.System.userInfo
  if (userInfo == null && to.name != 'login') {
     // next({
     //   name: 'login'
     // })
    next()
  } else {
    next()
  }
})
export default Routers
