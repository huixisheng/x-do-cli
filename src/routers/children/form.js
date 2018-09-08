/* generate by x-do-view */
const FormCouponAdd = () => import('src/views/form/Coupon-add');
const FormCouponDetail = () => import('src/views/form/Coupon-detail');
const FormCouponList = () => import('src/views/form/Coupon-list');
const FormCouponEdit = () => import('src/views/form/CouponEdit');
const FormTest = () => import('src/views/form/test');

const routerList = [];

routerList.push({
  path: 'coupon-add',
  component: FormCouponAdd,
  meta: {
    title: '',
  },
  name: 'formCouponAdd',
  hidden: false,
});

routerList.push({
  path: 'coupon-detail',
  component: FormCouponDetail,
  meta: {
    title: '',
  },
  name: 'formCouponDetail',
  hidden: false,
});

routerList.push({
  path: 'coupon-list',
  component: FormCouponList,
  meta: {
    title: '',
  },
  name: 'formCouponList',
  hidden: false,
});

routerList.push({
  path: 'coupon-edit',
  component: FormCouponEdit,
  meta: {
    title: '',
  },
  name: 'formCouponEdit',
  hidden: false,
});

routerList.push({
  path: 'test',
  component: FormTest,
  meta: {
    title: '页面标题',
  },
  name: 'formTest',
  hidden: false,
});

export default routerList;