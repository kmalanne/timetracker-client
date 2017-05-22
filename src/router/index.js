import Vue from 'vue';
import Router from 'vue-router';
import { requireAuth } from '@/auth';
import home from '@/containers/home';
import timeEntries from '@/containers/timeEntries';
import login from '@/components/login';

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/',
    name: 'home',
    component: home,
    beforeEnter: requireAuth,
  },
  {
    path: '/timeEntries',
    name: 'timeEntries',
    component: timeEntries,
    beforeEnter: requireAuth,
  },
];

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
});