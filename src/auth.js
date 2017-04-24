import Auth0 from 'auth0-js';
import axios from 'axios';

const auth0 = new Auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  responseType: 'token id_token',
  redirectUri: `${window.location.origin}/`,
});

const login = (email, password) => {
  auth0.redirect.loginWithCredentials({
    connection: 'Username-Password-Authentication',
    responseType: 'token id_token',
    email,
    password,
    scope: 'openid',
  }, (err) => {
    if (err) {
      // TODO handle error
    }
  });
};

const logout = () => {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
};

const getAuthHeader = () => `Bearer ${localStorage.getItem('id_token')}`;

const checkAuth = () => !!localStorage.getItem('id_token');

const requireAuth = (to, from, next) => {
  if (!checkAuth()) {
    const path = auth0.parseHash(window.location.hash, (err, authResult) => {
      if (err) {
        // TODO handle error
      }

      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', auth0.client.userInfo(authResult.accessToken, (userErr, user) => user));
        return '/';
      }

      return '/login';
    });

    next({ path });
  } else {
    next();
  }
};

const setAuthHeader = () => {
  if (localStorage.getItem('id_token')) {
    axios.defaults.headers.common.Authorization = getAuthHeader();
  }
};

setAuthHeader();

export default {
  login,
  logout,
  checkAuth,
  getAuthHeader,
  requireAuth,
};
