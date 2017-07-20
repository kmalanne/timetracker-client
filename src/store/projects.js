import axios from 'axios';

const mutations = {
  ADD_PROJECT: (state, { project }) => {
    state.projects.push(project);
  },

  DELETE_PROJECT: (state, { project }) => {
    state.projects.filter(p => p.id !== project.id);
  },

  SELECT_PROJECT: (state, { project }) => {
    state.selectedProject = project;
  },

  SET_PROJECTS: (state, { list }) => {
    state.projects = list;
  },

  UPDATE_PROJECT: (state, { project }) => {
    const idx = state.projects.map(p => p.id).indexOf(project.id);
    state.projects.splice(idx, 1, project);
  },
};

const actions = {
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

  DELETE_PROJECT: async ({ commit, rootGetters }, id) => {
    try {
      const response = await axios.delete('/projects', {
        params: {
          uid: rootGetters.userId,
          id,
        },
      });

      commit('DELETE_PROJECT', { project: response.data });
    } catch (err) {
      // TODO handle error
    }
  },

  LOAD_PROJECTS: async ({ commit, rootGetters }) => {
    try {
      const response = await axios.get('/projects', {
        params: {
          uid: rootGetters.userId,
        },
      });

      commit('SET_PROJECTS', { list: response.data });
    } catch (err) {
      // TODO handle error
    }
  },

  SELECT_PROJECT: ({ commit }, { project }) => {
    commit('SELECT_PROJECT', { project });
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
};

const getters = {
  selectedProject: (state) => {
    if (state.selectedProject) {
      return state.selectedProject;
    }

    return undefined;
  },

  projects: state => state.projects,
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
