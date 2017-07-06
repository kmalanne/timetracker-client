// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import axios from 'axios';
import app from './app';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'pink',
      hue: 200,
    },
    accent: {
      color: 'pink',
      hue: 100,
    },
    warn: {
      color: 'grey',
      hue: 900,
    },
    background: {
      color: 'white',
      hue: 100,
    },
  },
  green: {
    primary: 'green',
  },
  red: {
    primary: 'red',
  },
});

axios.defaults.baseURL = 'http://localhost:3000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  router,
  store,
  components: { app },
});
