<style scoped>

</style>

<template>
  <div>测试</div>
</template>

<script>
import Vue from 'vue';
import { transCreate, transUpdate, transDetail } from 'api/stock';
import TotalAmount from 'components/form/total-amount';
Vue.component('x-total-amount', TotalAmount);


export default {
  title: '标题',
  name: 'routerName',
  components: {
    TotalAmount,
  },
  data() {
    return {
      title: 'datatitle',
    };
  },
  props: {

  },
  computed: {

  },
  methods: {

  },
};
</script>