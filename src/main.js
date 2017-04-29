// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import app from './app';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  router,
  store,
  components: { app },
});
