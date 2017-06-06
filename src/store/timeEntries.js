import axios from 'axios';

const mutations = {
  SET_TIME_ENTRIES: (state, { timeEntries }) => {
    state.timeEntries = timeEntries;
  },

  ADD_TIME_ENTRY: (state, { timeEntry }) => {
    state.projects.push(timeEntry);
  },
};

const actions = {
  LOAD_TIME_ENTRIES: ({ commit, rootGetters }) => {
    axios.get('/timeEntries', {
      params: {
        uid: rootGetters.userId,
      },
    }).then((response) => {
      commit('SET_TIME_ENTRIES', { timeEntries: response.data });
    }, (err) => {
      if (err) {
        // TODO handle error
      }
    });
  },

  CREATE_TIME_ENTRY: ({ commit, rootGetters }, elapsedTime) => {
    axios.post('/timeEntries', {
      params: {
        uid: rootGetters.userId,
        pid: rootGetters.selectedProject.id,
        elapsedTime,
      },
    }).then((response) => {
      commit('ADD_TIME_ENTRY', { timeEntry: response.data });
    }, (err) => {
      if (err) {
        // TODO handle error
      }
    });
  },
};

const getters = {
};

const state = {
  timeEntries: [],
};

export default {
  state,
  actions,
  mutations,
  getters,
};
