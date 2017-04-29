import axios from 'axios';

const mutations = {
  SET_PROJECT_LIST: (state, { list }) => {
    state.projects = list;
  },
};

const actions = {
  LOAD_PROJECT_LIST: ({ commit, rootGetters }) => {
    axios.get('/projects', {
      params: {
        userId: rootGetters.userId,
      },
    }).then((response) => {
      commit('SET_PROJECT_LIST', { list: response.data });
    }, (err) => {
      if (err) {
        // TODO handle error
      }
    });
  },
};

const state = {
  projects: [],
};

const getters = {
};

export default {
  state,
  actions,
  mutations,
  getters,
};
