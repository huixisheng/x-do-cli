/* 使用x-do-component自动生成，修改会被覆盖 */
{% for item in list %}import {{ item.componentName }} from './{{ item.name }}';
{% endfor %}
{% if list.length > 1 %}const {{ componentName }} = {% raw %}{{% endraw %}{% for item in list %}
  {{ item.componentName }},{% endfor %}
};
export default {{ componentName }};
{% else %}
export default {{ list[0].componentName }};
{% endif %}