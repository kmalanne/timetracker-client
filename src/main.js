// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import auth from './auth';
import app from './app';
import router from './router';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      auth.logout();
      router.replace('/login');
    }
    return Promise.reject(error);
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  router,
  components: { app },
});
