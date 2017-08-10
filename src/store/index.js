import Vue from 'vue';
import Vuex from 'vuex';
import projects from './projects';
import auth from './auth';
import timeEntries from './timeEntries';
import notification from './notification';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    projects,
    timeEntries,
    notification,
  },
});

export default store;
