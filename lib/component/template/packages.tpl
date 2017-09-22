{% for item in list %}import {{ item.componentName }} from './{{ item.name }}';
{% endfor %}
/* 使用x-do-cli的命令 x component 自动生成 */

const packages = {% raw %}{{% endraw %}{% for item in list %}{% if item.list.length > 1 %}{% for subitem in item.list %}
  {{ item.componentName }}{{ subitem.componentName }}: {{ item.componentName }}.{{ subitem.componentName }},{% endfor %}{% else %}
  {{ item.componentName }},{% endif %}{% endfor %}
};

export default packages;
