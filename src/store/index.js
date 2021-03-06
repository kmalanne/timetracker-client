import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import notification from './notification';
import projects from './projects';
import reporting from './reporting';
import timeEntries from './timeEntries';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    notification,
    projects,
    reporting,
    timeEntries,
  },
});

export default store;
