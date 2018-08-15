/* 使用x-do-view自动生成，修改会被覆盖 */
{% for item in list %}const {{ item.componentName }} = () => import('{{ item.componentPath }}');
{% endfor %}
const routerList = [];
{% for item in list %}
routerList.push({
  path: '{{ item.routerPath }}',
  component: {{ item.componentName }},
  meta: {
    title: '{{ item.title }}',
  },
  name: '{{ item.routerName }}',
  hidden: {{ item.hidden }},
});
{% endfor %}

export default routerList;