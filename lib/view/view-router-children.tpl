{% for item in list %}const {{ item.componentName }} = () => import('{{ item.componentPath }}');
{% endfor %}
/* 使用x-do-cli的命令 x view 自动生成 */

const routerList = [];
{% for item in list %}
routerList.push({
  path: '{{ item.name }}',
  component: {{ item.componentName }},
  meta: {
    title: '{{ item.title }}',
  },
  name: '{{ item.camelizeComponentName }}',
  hidden: {{ item.hidden }},
});
{% endfor %}

export default routerList;