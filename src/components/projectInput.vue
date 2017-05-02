<template lang="html">
  <div id="project-input">
    <input class="project-input"
      autofocus autocomplete="off"
      placeholder="New project"
      v-model="project"
      @keyup.enter="addProject()">
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectInput',

  data() {
    return {
      project: '',
    };
  },

  methods: {
    addProject() {
      this.$store.dispatch('CREATE_PROJECT', { project: this.project });
      this.project = '';
    },
  },
};
</script>

<style scoped>
#project-input {
  display: flex;
  padding: 10px 13px 0px 13px;
  margin-bottom: 10px;
}

.project-input {
  flex: 1;
  padding: 3px;
  line-height: 35px;
  font-size: 20px;
  border-radius: 5px;
}
</style>
