import axios from 'axios';

const mutations = {
  ADD_PROJECT: (state, payload) => {
    const { project } = payload;
    state.projects = [...state.projects, project];
  },

  DELETE_PROJECT: (state, payload) => {
    const { id } = payload;
    const idx = state.projects.findIndex(p => p.id === id);
    state.projects.splice(idx, 1);
  },

  SELECT_PROJECT: (state, payload) => {
    const { project } = payload;
    state.selectedProject = project;
  },

  SET_PROJECTS: (state, payload) => {
    const { data } = payload;
    state.projects = data;
  },

  UPDATE_PROJECT: (state, payload) => {
    const { project } = payload;
    const idx = state.projects.findIndex(p => p.id === project.id);
    state.projects.splice(idx, 1, project);
  },
};

const actions = {
  CREATE_PROJECT: async ({ commit, dispatch }, { name, url }) => {
    try {
      const response = await axios.post('/projects', { name, url });

      if (response.data.length !== 0) {
        commit('ADD_PROJECT', { project: response.data[0] });
      }
    } catch (err) {
      dispatch('SET_NOTIFICATION', { notification: 'Creating new project failed' });
    }
  },

  DELETE_PROJECT: async ({ commit, dispatch }, id) => {
    try {
      const response = await axios.delete(`/projects/${id}`);

      if (response.data) {
        commit('DELETE_PROJECT', { id: response.data });
      }
    } catch (err) {
      dispatch('SET_NOTIFICATION', { notification: 'Deleting project(s) failed' });
    }
  },

  FETCH_PROJECTS: async ({ commit, dispatch }) => {
    try {
      const response = await axios.get('/projects');
      commit('SET_PROJECTS', { data: response.data });
    } catch (err) {
      dispatch('SET_NOTIFICATION', { notification: 'Loading projects failed' });
    }
  },

  SELECT_PROJECT: ({ commit }, { project }) => {
    commit('SELECT_PROJECT', { project });
  },

  UPDATE_PROJECT: async ({ commit, dispatch }, project) => {
    try {
      const { name, url } = project;
      const response = await axios.put(`/projects/${project.id}`, { name, url });

      if (response.data.length !== 0) {
        commit('UPDATE_PROJECT', { project: response.data[0] });
      }
    } catch (err) {
      dispatch('SET_NOTIFICATION', { notification: 'Updating project failed' });
    }
  },
};

const getters = {
  projects: state => state.projects,
  selectedProject: state => state.selectedProject,
};

const state = {
  projects: [],
  selectedProject: undefined,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
