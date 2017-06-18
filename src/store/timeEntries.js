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
  LOAD_TIME_ENTRIES: async ({ commit, rootGetters }) => {
    try {
      const response = await axios.get('/timeEntries', {
        params: {
          uid: rootGetters.userId,
        },
      });
      commit('SET_TIME_ENTRIES', { timeEntries: response.data });
    } catch (err) {
      // TODO handle error
    }
  },

  CREATE_TIME_ENTRY: async ({ commit, rootGetters }, elapsedTime) => {
    try {
      const response = await axios.post('/timeEntries', {
        params: {
          uid: rootGetters.userId,
          pid: rootGetters.selectedProject.id,
          elapsedTime,
        },
      });
      commit('ADD_TIME_ENTRY', { timeEntry: response.data });
    } catch (err) {
      // TODO handle error
    }
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
