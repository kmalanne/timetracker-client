import axios from 'axios';

const mutations = {
  SET_PAGINATION: (state, payload) => {
    const { page, limit, size } = payload;
    state.page = page;
    state.limit = limit;
    state.size = size || 10;
  },

  SET_TIME_ENTRIES: (state, payload) => {
    const { data } = payload;
    state.timeEntries = data;
  },
};

const actions = {
  CREATE_TIME_ENTRY: async (
    { commit, dispatch, rootGetters },
    { elapsedTime, startTime, stopTime }) => {
    try {
      await axios.post('/timeEntries', {
        project: rootGetters.selectedProject.id,
        elapsed_time: elapsedTime,
        start_time: startTime.toISOString(),
        stop_time: stopTime.toISOString(),
      });
    } catch (err) {
      dispatch('SET_NOTIFICATION', { notification: 'Creating time entry failed' });
    }
  },

  FETCH_TIME_ENTRIES: async ({ commit, state, dispatch }, { page, limit }) => {
    try {
      const currentPage = page || state.page;
      const currentLimit = limit || state.limit;

      const response = await axios.get('/timeEntries', {
        params: {
          page: currentPage,
          limit: currentLimit,
        },
      });

      commit('SET_TIME_ENTRIES', response.data);
      commit('SET_PAGINATION', { page: currentPage, limit: currentLimit, size: response.data.total });
    } catch (err) {
      dispatch('SET_NOTIFICATION', { notification: 'Loading time entries failed' });
    }
  },
};

const getters = {
  limit: state => state.limit,
  page: state => state.page,
  size: state => state.size,

  timeEntries: (state) => {
    if (state.timeEntries) {
      return state.timeEntries;
    }

    return undefined;
  },
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
