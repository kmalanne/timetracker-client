import Auth0 from 'auth0-js';
import decode from 'jwt-decode';

const ID_TOKEN = 'id_token';
const PROFILE = 'profile';

const auth0 = new Auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  responseType: 'token id_token',
  redirectUri: `${window.location.origin}/`,
});

const setIdToken = (idToken) => {
  localStorage.setItem(ID_TOKEN, idToken);
};

const setProfile = (profile) => {
  localStorage.setItem(PROFILE, JSON.stringify(profile));
};

const getIdToken = () => localStorage.getItem(ID_TOKEN);
const getProfile = () => JSON.parse(localStorage.getItem(PROFILE));

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
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(PROFILE);
};

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

const isLoggedIn = () => {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
};

const requireAuth = (to, from, next) => {
  if (!isLoggedIn()) {
    const path = auth0.parseHash(window.location.hash, (err, authResult) => {
      if (err) {
        // TODO handle error
      }

      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setIdToken(authResult.idToken);

        auth0.client.userInfo(authResult.accessToken, (userErr, user) => {
          if (userErr) {
            // TODO handle error
          }

          setProfile(user);
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
  login,
  logout,
  isLoggedIn,
  requireAuth,
  getIdToken,
  getProfile,
};
