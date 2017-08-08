import axios from 'axios';

const mutations = {
  SET_TIME_ENTRIES: (state, timeEntries) => {
    state.timeEntries = timeEntries;
  },

  ADD_TIME_ENTRY: (state, timeEntry) => {
    state.timeEntries = [...state.timeEntries, timeEntry];
  },

  SET_TIME_ENTRY_PAGINATION_PARAMS: (state, { page, limit }) => {
    state.page = page;
    state.limit = limit;
  },
};

const actions = {
  LOAD_TIME_ENTRIES: async ({ commit, state }) => {
    try {
      const response = await axios.get('/timeEntries', {
        params: {
          page: state.page,
          limit: state.limit,
        },
      });
      commit('SET_TIME_ENTRIES', response.data);
    } catch (err) {
      // TODO handle error
    }
  },

  CREATE_TIME_ENTRY: async (
    { commit, rootGetters },
    { elapsedTime, startTime, stopTime }) => {
    try {
      await axios.post('/timeEntries', {
        params: {
          project: rootGetters.selectedProject.id,
          elapsed_time: elapsedTime,
          start_time: startTime.toISOString(),
          stop_time: stopTime.toISOString(),
        },
      });
    } catch (err) {
      // TODO handle error
    }
  },

  SET_TIME_ENTRY_PAGINATION_PARAMS: async ({ commit }, { page, limit }) => {
    commit('SET_TIME_ENTRY_PAGINATION_PARAMS', { page, limit });
  },
};

const getters = {
  timeEntries: (state) => {
    if (state.timeEntries) {
      return state.timeEntries;
    }

    return undefined;
  },

  page: state => state.page,
  limit: state => state.limit,
  size: state => state.size,
};

const state = {
  timeEntries: [],
  page: 1,
  limit: 10,
  size: 10,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
