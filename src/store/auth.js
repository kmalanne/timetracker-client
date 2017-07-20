import decode from 'jwt-decode';
import { auth0 } from '@/auth';

const ID_TOKEN = 'id_token';
const PROFILE = 'profile';

const getTokenExpirationDate = (encodedToken) => {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
};

const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    localStorage.setItem(ID_TOKEN, token);
  },

  SET_PROFILE: (state, profile) => {
    state.profile = profile;
    localStorage.setItem(PROFILE, JSON.stringify(profile));
  },

  LOGOUT: (state) => {
    state.token = null;
    state.profile = null;
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(PROFILE);
  },
};

const actions = {
  AUTHENTICATION_SUCCESS: (store) => {
    store.dispatch('LOAD_PROJECTS');
    store.dispatch('LOAD_TIME_ENTRIES');
  },

  LOGIN: ({ commit }, payload) => {
    auth0.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      responseType: 'token id_token',
      email: payload.email,
      password: payload.password,
      scope: 'openid',
    }, (err) => {
      if (err) {
        // TODO handle error
      }
    });
  },

  SET_TOKEN: ({ commit }, token) => {
    commit('SET_TOKEN', token);
  },

  SET_PROFILE: ({ commit }, profile) => {
    commit('SET_PROFILE', profile);
  },

  LOGOUT: ({ commit }) => {
    commit('LOGOUT');
  },
};

const getters = {
  isLoggedIn: state => !!state.token && !isTokenExpired(state.token),

  userId: (state) => {
    if (state.profile) {
      return state.profile.identities[0].user_id;
    }
    return '';
  },

  avatar: (state) => {
    if (state.profile) {
      return state.profile.picture;
    }
    return undefined;
  },
};

const state = {
  token: null,
  profile: null,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
