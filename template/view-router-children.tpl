/* 根据 x view 命令自动生成 */
{% for item in list %}
const {{ item.componentName }} = () => import('{{ item.componentPath }}');{% endfor %}

const routerList = [];

{% for item in list %}
routerList.push(
{
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