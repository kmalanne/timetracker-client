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

  CREATE_PROJECT: ({ commit, rootGetters }, { item }) => {
    axios.post('/projects', {
      params: {
        uid: rootGetters.userId,
        name: item,
      },
    }).then((response) => {
      commit('ADD_PROJECT', { project: response.data });
    }, (err) => {
      if (err) {
        // TODO handle error
      }
    });
  },

  UPDATE_PROJECT: ({ commit }, { project }) => {
    axios.put(`/projects/${project.id}`, {
      params: {
        name: project.name,
        url: project.url,
      },
    }).then((response) => {
      commit('UPDATE_PROJECT', { project: response.data });
    }, (err) => {
      if (err) {
        // TODO handle error
      }
    });
  },

  SELECT_PROJECT: ({ commit }, { project }) => {
    commit('SELECT_PROJECT', project);
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
