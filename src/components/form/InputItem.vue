<template>
<div><slot name="header"></slot></div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {
    // value: {
    //   type: [Object, Array],
    //   required: true,
    //   default: 0,
    //   validator (value) {
    //     return ['success', 'warning', 'danger'].indexOf(value) !== -1
    //   },
    // },
  },

  data() {
    return {

    };
  },

  computed: {
    // valueName() {
    //   return '';
    // },
  },

  watch: {
    // type: {
    //   immediate: true,
    //   handler (val) {
    //     this.currentType = val;
    //   },
    //   deep: true,
    // }
  },

  created() {

  },

  mounted() {

  },

  destroyed() {},

  methods: {

  },
};
</script>

<style lang="less" scoped>

</style>