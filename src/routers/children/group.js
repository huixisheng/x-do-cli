/* generate by x-do-view */
const GroupCard = () => import('src/views/group/card');
const GroupCard1 = () => import('src/views/group/card1');

const routerList = [];

routerList.push({
  path: 'card',
  component: GroupCard,
  meta: {
    title: '页面标题',
  },
  name: 'groupCard',
  hidden: false,
});

routerList.push({
  path: 'card1',
  component: GroupCard1,
  meta: {
    title: '页面标题',
  },
  name: 'groupCard1',
  hidden: false,
});

export default routerList;