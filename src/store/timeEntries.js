import axios from 'axios';

const mutations = {
  SET_TIME_ENTRIES: (state, timeEntries) => {
    state.timeEntries = timeEntries;
  },

  ADD_TIME_ENTRY: (state, timeEntry) => {
    state.timeEntries = [...state.timeEntries, timeEntry];
  },
};

const actions = {
  LOAD_TIME_ENTRIES: async ({ commit }) => {
    try {
      const response = await axios.get('/timeEntries');
      commit('SET_TIME_ENTRIES', response.data);
    } catch (err) {
      // TODO handle error
    }
  },

  CREATE_TIME_ENTRY: async ({ commit, rootGetters }, elapsedTime) => {
    try {
      const response = await axios.post('/timeEntries', {
        params: {
          pid: rootGetters.selectedProject.id,
          elapsedTime,
        },
      });

      if (response.data.length !== 0) {
        commit('ADD_TIME_ENTRY', response.data[0]);
      }
    } catch (err) {
      // TODO handle error
    }
  },
};

const getters = {
  timeEntries: (state) => {
    if (state.timeEntries) {
      return state.timeEntries;
    }

    return undefined;
  },
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
