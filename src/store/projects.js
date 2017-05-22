import axios from 'axios';

const mutations = {
  SET_PROJECT_LIST: (state, { list }) => {
    state.projects = list;
  },

  ADD_PROJECT: (state, { project }) => {
    state.projects.push(project);
  },

  UPDATE_PROJECT: (state, { project }) => {
    const idx = state.projects.map(p => p.id).indexOf(project.id);
    state.projects.splice(idx, 1, project);
  },
};

const actions = {
  LOAD_PROJECT_LIST: ({ commit, rootGetters }) => {
    axios.get('/projects', {
      params: {
        uid: rootGetters.userId,
      },
    }).then((response) => {
      commit('SET_PROJECT_LIST', { list: response.data });
    }, (err) => {
      if (err) {
        // TODO handle error
      }
    });
  },

  CREATE_PROJECT: ({ commit, rootGetters }, project) => {
    axios.post('/projects', {
      params: {
        uid: rootGetters.userId,
        name: project,
      },
    }).then((response) => {
      commit('ADD_PROJECT', { project: response.data });
    }, (err) => {
      if (err) {
        // TODO handle error
      }
    });
  },

  UPDATE_PROJECT: ({ commit }, project) => {
    axios.put(`/projects/${project.id}`, {
      params: {
        name: project.name,
      },
    }).then((response) => {
      commit('UPDATE_PROJECT', { project: response.data });
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