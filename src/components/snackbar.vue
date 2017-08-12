<template lang="html">
  <md-snackbar ref="snackbarr" :md-duration="4000">
    <span>{{ message }}</span>
    <md-button class="md-accent" @click="$refs.snackbar.close()">Close</md-button>
  </md-snackbar>
</template>

<script>
export default {
  name: 'snackbar',

  data() {
    return {
      message: null,
    };
  },

  computed: {
    notification() {
      return this.$store.getters.notification;
    },
  },

  watch: {
    notification(value) {
      if (value !== null) {
        this.message = value;
        this.open();
      }
    },
  },

  methods: {
    open() {
      this.$nextTick(() => {
        this.$refs.snackbarr.open();
      });

      this.$store.dispatch('SET_NOTIFICATION', { notification: null });
    },
  },
};
</script>
