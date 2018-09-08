import Vue from 'vue';
import Router from 'vue-router';
const Error404 = '';

// 以下子路由自己添加
// import childrenForm from './children/form';
// import childrenGroup from './children/group';
// import childrenGroup1 from './children/group1';
// import childrenGroup2 from './children/group2';

// 以下子路由自己添加
// import childrenundefined from './children/form';
// import childrenundefined from './children/group';
// import childrenundefined from './children/group1';
// import childrenundefined from './children/group2';

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


export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  linkActiveClass: 'router-active',
});
