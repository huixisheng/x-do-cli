/* generate by x-do-view */
const Group2Card = () => import('src/views/group2/card');
const Group2Card1 = () => import('src/views/group2/card1');

const routerList = [];

routerList.push({
  path: 'card',
  component: Group2Card,
  meta: {
    title: '页面标题',
  },
  name: 'group2Card',
  hidden: false,
});

routerList.push({
  path: 'card1',
  component: Group2Card1,
  meta: {
    title: '页面标题',
  },
  name: 'group2Card1',
  hidden: false,
});

export default routerList;