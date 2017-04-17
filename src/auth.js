import Auth0Lock from 'auth0-lock';
import axios from 'axios';

const clientId = process.env.AUTH0_CLIENT_ID;
const domain = process.env.AUTH0_DOMAIN;
const lockOptions = {
  theme: {
    primaryColor: '#34495e',
  },
  languageDictionary: {
    emailInputPlaceholder: 'email@example.com',
    title: '',
    passwordInputPlaceholder: 'password',
  },
};

const lock = new Auth0Lock(clientId, domain, lockOptions);

function logout() {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
}

function getAuthHeader() {
  return `Bearer ${localStorage.getItem('id_token')}`;
}

function checkAuth() {
  return !!localStorage.getItem('id_token');
}

function requireAuth(to, from, next) {
  if (!checkAuth()) {
    next({
      path: '/login',
    });
  } else {
    next();
  }
}

function setAuthHeader() {
  if (localStorage.getItem('id_token')) {
    axios.defaults.headers.common.Authorization = getAuthHeader();
  }
}

setAuthHeader();

export default {
  lock,
  logout,
  checkAuth,
  getAuthHeader,
  requireAuth,
};
