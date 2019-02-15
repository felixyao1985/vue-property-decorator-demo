/**
 * Created by felix on 2018/9/19.
 */

/**
 *  feedback
 * @type {{path: string, component: (function(*=): *), meta: {title: string}, children: *[]}}
 */
export default {
  path: '/',
  component: resolve => require(['@/pages/Home.vue'], resolve),
  meta: {
    showMenu:true,
    title: '首页'
  },
  children: [
    {
      path: 'home',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'home',
          name:'home',
          component: resolve => require(['./home'], resolve),
        },
      ]
    },
  ]
}
