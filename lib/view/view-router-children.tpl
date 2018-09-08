/* generate by x-do-view */
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