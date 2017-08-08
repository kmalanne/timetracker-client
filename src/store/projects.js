import axios from 'axios';

const mutations = {
  ADD_PROJECT: (state, project) => {
    state.projects = [...state.projects, project];
  },

  DELETE_PROJECT: (state, id) => {
    const idx = state.projects.findIndex(p => p.id === id);
    state.projects.splice(idx, 1);
  },

  SELECT_PROJECT: (state, { project }) => {
    state.selectedProject = project;
  },

  SET_PROJECTS: (state, projects) => {
    state.projects = projects;
  },

  UPDATE_PROJECT: (state, project) => {
    const idx = state.projects.findIndex(p => p.id === project.id);
    state.projects.splice(idx, 1, project);
  },
};

const actions = {
  CREATE_PROJECT: async ({ commit }, { name, url }) => {
    try {
      const response = await axios.post('/projects', {
        params: {
          name,
          url,
        },
      });

      if (response.data.length !== 0) {
        commit('ADD_PROJECT', response.data[0]);
      }
    } catch (err) {
      // TODO handle error
    }
  },

  DELETE_PROJECT: async ({ commit }, id) => {
    try {
      const response = await axios.delete(`/projects/${id}`);
      if (response.data) {
        commit('DELETE_PROJECT', response.data);
      }
    } catch (err) {
      // TODO handle error
    }
  },

  LOAD_PROJECTS: async ({ commit }) => {
    try {
      const response = await axios.get('/projects');
      commit('SET_PROJECTS', response.data);
    } catch (err) {
      // TODO handle error
    }
  },

  SELECT_PROJECT: ({ commit }, { project }) => {
    commit('SELECT_PROJECT', { project });
  },

  UPDATE_PROJECT: async ({ commit }, project) => {
    try {
      const response = await axios.put(`/projects/${project.id}`, {
        params: {
          name: project.name,
          url: project.url,
        },
      });

      if (response.data.length !== 0) {
        commit('UPDATE_PROJECT', response.data[0]);
      }
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
