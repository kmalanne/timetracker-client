import Auth0 from 'auth0-js';
import axios from 'axios';
import store from './store';

const auth0 = new Auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  responseType: 'token id_token',
  redirectUri: `${window.location.origin}/`,
});

const requireAuth = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    const path = auth0.parseHash(window.location.hash, (err, authResult) => {
      if (err) {
        // TODO handle error
      }

      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        store.dispatch('SET_TOKEN', authResult.idToken);
        axios.defaults.headers.common.Authorization = `Bearer ${authResult.idToken}`;

        auth0.client.userInfo(authResult.accessToken, (userErr, user) => {
          if (userErr) {
            // TODO handle error
          }

          store.dispatch('SET_PROFILE', user);

          // User information is needed for loading initial data and components are
          // mounted before userInfo is gotten from Auth0 so loading is done here.
          store.dispatch('AUTHENTICATION_SUCCESS');
        });

        return '/';
      }

      return '/login';
    });

    next({ path });
  } else {
    next();
  }
};

export {
  auth0,
  requireAuth,
};
