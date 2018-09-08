/* generate by x-do-component */
{% for item in list %}import {{ item.componentName }} from './{{ item.name }}';
{% endfor %}
const packages = {% raw %}{{% endraw %}{% for item in list %}{% if item.list.length > 1 %}{% for subitem in item.list %}
  {{ item.componentName }}{{ subitem.componentName }}: {{ item.componentName }}.{{ subitem.componentName }},{% endfor %}{% else %}
  {{ item.componentName }},{% endif %}{% endfor %}
};

export default packages;