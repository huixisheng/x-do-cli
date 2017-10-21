import Vue from 'vue';
import 'src/main-page';

import App from './app';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});