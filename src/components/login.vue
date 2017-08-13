<template>
  <div class="login">
    <div class="login-wrapper">
      <md-card class="login-card">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
  
        <md-card-content>
          <form>
            <md-input-container :class="{'md-input-invalid': errors.has('email')}">
              <label for="email">Email</label>
              <md-input v-model="credentials.email" data-vv-name="email" type="email" v-validate name="email" data-vv-rules="required|email" @keyup.enter.native="login()"></md-input>
              <span class="md-error">{{errors.first('email')}}</span>
            </md-input-container>
  
            <md-input-container :class="{'md-input-invalid': errors.has('password')}">
              <label for="password">Password</label>
              <md-input v-model="credentials.password" data-vv-name="password" type="password" v-validate name="password" data-vv-rules="required" @keyup.enter.native="login()"></md-input>
              <span class="md-error">{{errors.first('password')}}</span>
            </md-input-container>
          </form>
        </md-card-content>
  
        <md-card-actions>
          <md-button class="md-dense" @click="signup()">Sign up</md-button>
          <md-button class="md-primary" @click="login()">Login</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',

  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    async login() {
      const result = await this.$validator.validateAll();
      if (!result) {
        // eslint-disable-next-line
        return;
      }

      this.$store.dispatch('LOGIN',
        { email: this.credentials.email, password: this.credentials.password });
    },

    async signup() {
      const result = await this.$validator.validateAll();
      if (!result) {
        // eslint-disable-next-line
        return;
      }

      this.$store.dispatch('SIGNUP',
        { email: this.credentials.email, password: this.credentials.password });
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
</style>
