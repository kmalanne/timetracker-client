<template>
  <div id="login">
    <div class="login-wrapper">
      <h1>
        <i class="fa fa-clock-o fa-3x"></i>
      </h1>
      <h1 class="login-title">TimeTracker</h1>
      <form>
        <div class="form-group">
          <input type="email" class="form-control" v-model="email" placeholder="your@email.com">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <button type="button" class="btn btn-primary btn-login" @click="login()">Log in</button>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'login',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    login() {
      this.$store.dispatch('LOGIN', { email: this.email, password: this.password });
    },
  },
};
</script>

<style>
#login {
  width: 100%;
  height: calc(100vh + 56px);
  background-color: #7e57c2;
}

.login-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 10px;
  color: #fff;
}

.login-title {
  margin-bottom: 20px;
}

.btn-login {
  width: 100%;
  background-color: #4d2c91;
  border-color: #4d2c91;
}

.btn-login:hover {
  background-color: #401F84;
  border-color: #401F84;
}
</style>
