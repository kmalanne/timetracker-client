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

  SELECT_PROJECT: (state, { project }) => {
    state.selectedProject = project;
  },
};

const actions = {
  LOAD_PROJECT_LIST: async ({ commit, rootGetters }) => {
    try {
      const response = await axios.get('/projects', {
        params: {
          uid: rootGetters.userId,
        },
      });

      commit('SET_PROJECT_LIST', { list: response.data });
    } catch (err) {
      // TODO handle error
    }
  },

  CREATE_PROJECT: async ({ commit, rootGetters }, { project }) => {
    try {
      const response = await axios.post('/projects', {
        params: {
          uid: rootGetters.userId,
          name: project.name,
          url: project.url,
        },
      });

      commit('ADD_PROJECT', { project: response.data });
    } catch (err) {
      // TODO handle error
    }
  },

  UPDATE_PROJECT: async ({ commit }, { project }) => {
    try {
      const response = await axios.put(`/projects/${project.id}`, {
        params: {
          name: project.name,
          url: project.url,
        },
      });

      commit('UPDATE_PROJECT', { project: response.data });
    } catch (err) {
      // TODO handle error
    }
  },

  SELECT_PROJECT: ({ commit }, { project }) => {
    commit('SELECT_PROJECT', { project });
  },
};

const getters = {
  selectedProject: (state) => {
    if (state.selectedProject) {
      return state.selectedProject;
    }

    return undefined;
  },
};

const state = {
  projects: [],
  selectedProject: null,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
