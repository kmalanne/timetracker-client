<template lang="html">
  <button class="new-project-btn"
    @click="newProject()">+
  </button>
</template>

<script>
export default {
  name: 'newProjectButton',

  methods: {
    newProject() {
      this.$store.dispatch('CREATE_PROJECT', { project: 'New project' });
    },
  },
};
</script>

<style scoped>
.new-project-btn {
  display: block;
  position: absolute;
  padding-bottom: 8px;
  left: 55px;
  top: 150px;
  transform: translateY(-50%) translateX(-50%);
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 50%;
  font-size: 40px;
  line-height: 0px;
  background-color: #4d2c91;
  color: #fff;
  transition: background-color 0.2s ease-out;
}

.new-project-btn:hover {
  filter: brightness(95%);
}
</style>
