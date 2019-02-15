/**
 * Created by felix on 2018/9/19.
 */

/**
 *  feedback
 * @type {{path: string, component: (function(*=): *), meta: {title: string}, children: *[]}}
 */
export default {
  path: '/404',
  name: 'error404',
  component: resolve => require(['@/pages/noFound/NoFound.vue'], resolve),
}
