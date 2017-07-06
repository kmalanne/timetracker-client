<template>
  <div class="login">
    <div class="login-wrapper">
  
      <md-card class="login-card">
  
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
  
        <md-card-content>
          <form>
            <md-input-container>
              <label>Email</label>
              <md-textarea v-model="email"></md-textarea>
            </md-input-container>
            <md-input-container @keyup.enter="login()">
              <label>Password</label>
              <md-input type="password" v-model="password"></md-input>
            </md-input-container>
          </form>
        </md-card-content>
  
        <md-button class="md-raised md-primary" @click="login()">Go</md-button>
  
      </md-card>
  
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
.login {
  width: 100%;
  height: 100vh;
  background-color: #ffc1e3;
}

.login-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-card {
  width: 350px;
}

.md-card .md-card-content {
  padding-bottom: 8px;
}
</style>
