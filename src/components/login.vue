<template>
  <div id="login">
    <div class="login__wrapper">
      <h1><i class="fa fa-clock-o fa-5x"></i></h1>
      <h1 class="login-title">TimeTracker</h1>
      <div class="login-button__wrapper">
        <button class="btn btn-primary"
                @click="login()">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth';

export default {
  ready() {
    auth.lock.on('authenticated', (authResult) => {
      auth.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', authResult.idToken);
        auth.setAuthHeader();
      });
    });
  },

  methods: {
    login() {
      auth.lock.show();
    },
  },
};
</script>

<style>
#login {
  width: 100%;
  height: calc(100vh + 56px);
  background-color: #292b2c;
}

.login__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
}

.login-title {
  margin-bottom: 20px;
}
</style>
