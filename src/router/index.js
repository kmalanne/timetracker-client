import Vue from 'vue';
import Router from 'vue-router';
import { requireAuth } from '@/auth';
import home from '@/containers/home';
import projects from '@/containers/projects';
import reports from '@/containers/reports';
import login from '@/components/login';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    beforeEnter: requireAuth,
  },
  {
    path: '/reports',
    name: 'reports',
    component: reports,
    beforeEnter: requireAuth,
  },
  {
    path: '/projects',
    name: 'projects',
    component: projects,
    beforeEnter: requireAuth,
  },
];

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
});
