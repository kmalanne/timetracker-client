import axios from 'axios';
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
  LOGOUT: (state) => {
    state.token = null;
    state.profile = null;
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(PROFILE);
  },

  SET_PROFILE: (state, profile) => {
    state.profile = profile;
    localStorage.setItem(PROFILE, JSON.stringify(profile));
  },

  SET_TOKEN: (state, token) => {
    state.token = token;
    localStorage.setItem(ID_TOKEN, token);
  },
};

const actions = {
  AUTHENTICATION_SUCCESS: (store) => {
    store.dispatch('FETCH_PROJECTS');
  },

  LOGIN: ({ commit, dispatch }, payload) => {
    auth0.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      responseType: 'token id_token',
      email: payload.email,
      password: payload.password,
      scope: 'openid',
    }, (err) => {
      if (err) {
        dispatch('SET_NOTIFICATION', { notification: err.description });
      }
    });
  },

  LOGOUT: ({ commit }) => {
    commit('LOGOUT');
  },

  SET_PROFILE: ({ commit }, profile) => {
    commit('SET_PROFILE', profile);
  },

  SET_TOKEN: ({ commit }, token) => {
    commit('SET_TOKEN', token);
  },

  SIGNUP: async ({ commit, dispatch }, payload) => {
    try {
      const url = `https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`;
      const headers = { 'content-type': 'application/json' };

      const response = await axios.post(url, {
        connection: 'Username-Password-Authentication',
        client_id: process.env.AUTH0_CLIENT_ID,
        email: payload.email,
        password: payload.password,
      }, headers);

      if (response.status === 200) {
        dispatch('SET_NOTIFICATION', { notification: 'Successfully signed up!' });
      }
    } catch (err) {
      dispatch('SET_NOTIFICATION', { notification: 'Something went wrong!' });
    }
  },
};

const getters = {
  avatar: (state) => {
    if (state.profile) {
      return state.profile.picture;
    }
    return undefined;
  },

  isLoggedIn: state => !!state.token && !isTokenExpired(state.token),
};

const state = {
  profile: null,
  token: null,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
