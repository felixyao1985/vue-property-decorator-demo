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
    title: '系统管理'
  },
  children: [
    {
      path: '/demo',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '内容管理'
      },
      children: [
        {
          path:'list',
          name:'list',
          component: resolve => require(['./list'], resolve),
          meta: {
            showMenu:true,
            title: '懂得入'
          },
        },
        {
          path:'modify/:id',
          name:'modify',
          component: resolve => require(['./modify'], resolve),
          props:true,
          meta: {
            title: '活动管理'
          },
        }
      ]
    }
  ]
}
