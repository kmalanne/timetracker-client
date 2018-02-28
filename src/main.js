// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import app from './app';
import router from './router';
import store from './store';
import { formatDateISOString, formatTimeInMs } from './util/time';

Vue.config.productionTip = false;

Vue.use(VeeValidate);
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

Vue.filter('formatDate', (value) => {
  if (value) {
    return formatDateISOString(value);
  }

  return '';
});

Vue.filter('formatTime', (value) => {
  if (value) {
    const time = formatTimeInMs(value);
    return `${time.hours}:${time.minutes}:${time.seconds}`;
  }

  return '';
});

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  router,
  store,
  components: { app },
});
