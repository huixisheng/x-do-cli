import Vue from 'vue';
import Router from 'vue-router';
import { Layout, Error404 } from 'layout/panjiachen/index';


Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/v1/error',
    name: 'error404',
    redirect: '/v1/error/404',
    component: Layout,
    children: [{
      path: '404',
      component: Error404,
    }],
    hidden: true,
  },
];


export const asyncRouterMap = [

];


if (process.env.NODE_ENV === 'development') {
  // constantRouterMap.push();
}

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  linkActiveClass: 'router-active',
});