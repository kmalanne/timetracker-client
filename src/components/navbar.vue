<template lang="html">
  <nav class="navbar navbar-toggleable-md navbar-inverse" v-if="isLoggedIn()">
    <button class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h1 class="navbar-brand mb-0"><i class="fa fa-clock-o"></i>&nbsp;TimeTracker</h1>
    <div class="collapse navbar-collapse"
         id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link"
             to="/" exact>Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
             to="/timeEntries">Time entries</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <button class="btn btn-secondary"
                  type="button"
                  @click="logout()">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',

  methods: {
    logout() {
      this.$store.dispatch('LOGOUT');
      this.$router.push('/login');
    },

    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style>
.navbar-inverse {
  background-color: #7e57c2 !important;
}
</style>
