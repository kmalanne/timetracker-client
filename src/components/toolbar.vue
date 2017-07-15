<template lang="html">
  <div class="toolbar" v-if="isLoggedIn()">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title toolbar-title">TimeTracker</h2>
      <md-button @click="logout()">Logout</md-button>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Menu</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item @click="routeTo('/')">
          <md-icon>home</md-icon>
          <span>Home</span>
        </md-list-item>
        <md-list-item @click="routeTo('reports')">
          <md-icon>pie_chart</md-icon> 
          <span>Reports</span>
        </md-list-item>
        <md-list-item @click="routeTo('projects')">
          <md-icon>folder</md-icon> 
          <span>Projects</span>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
export default {
  name: 'toolbar',

  methods: {
    logout() {
      this.$store.dispatch('LOGOUT');
      this.$router.push('/login');
    },

    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },

    routeTo(path) {
      this.$router.push({ path });
      this.toggleLeftSidenav();
    },
  },
};
</script>

<style>
.toolbar-title {
  flex: 1;
}
</style>
