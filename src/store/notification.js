const mutations = {
  SET_NOTIFICATION: (state, payload) => {
    const { notification } = payload;
    state.notification = notification;
  },
};

const actions = {
  SET_NOTIFICATION: async ({ commit }, { notification }) => {
    commit('SET_NOTIFICATION', { notification });
  },
};

const getters = {
  notification: state => state.notification,
};

const state = {
  notification: null,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
