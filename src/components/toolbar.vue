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
      <md-toolbar class="md-account-header">
        <md-list class="md-transparent">
          <md-list-item class="md-avatar-list"> 
            <md-avatar class="md-large">
              <img :src="avatarImage" alt="People">
            </md-avatar>
          </md-list-item>
          <md-list-item>
            <div class="md-list-text-container">
              <span>Menu</span>
            </div>
          </md-list-item>
        </md-list>
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

  computed: {
    avatarImage() {
      return this.$store.getters.avatar;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('LOGOUT');
      this.$router.push('/');
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
