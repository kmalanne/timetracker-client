import Vue from 'vue';
import Router from 'vue-router';
import home from './containers/home';
import timeEntries from './containers/timeEntries';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: home,
  },
  {
    path: '/timeEntries',
    component: timeEntries,
  },
];

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
});
