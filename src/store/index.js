import Vue from 'vue';
import Vuex from 'vuex';
import projects from './projects';
import auth from './auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    projects,
  },
});

export default store;
