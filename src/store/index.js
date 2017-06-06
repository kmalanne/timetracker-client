import Vue from 'vue';
import Vuex from 'vuex';
import projects from './projects';
import auth from './auth';
import timeEntries from './timeEntries';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    projects,
    timeEntries,
  },
});

export default store;
