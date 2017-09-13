import axios from 'axios';

const mutations = {
  SET_DATA: (state, payload) => {
    const { data } = payload;
    state.reportData = data;
  },
};

const actions = {
  FETCH_DATA: async ({ commit, state, dispatch }, { startDate, endDate }) => {
    try {
      const response = await axios.get('/timeEntries', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });

      commit('SET_DATA', response.data);
    } catch (err) {
      dispatch('SET_NOTIFICATION', { notification: 'Loading reporting data failed' });
    }
  },
};

const getters = {
  reportData: (state) => {
    if (state.reportData) {
      return state.reportData;
    }

    return undefined;
  },
};

const state = {
  reportData: [],
};

export default {
  state,
  actions,
  mutations,
  getters,
};
