<template lang="html">
  <md-input-container>
    <label for="project">Project</label>
    <md-select v-model="selected" @change="onChange()">
      <md-option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</md-option>
    </md-select>
  </md-input-container>
</template>

<script>
export default {
  name: 'projectSelect',

  mounted() {
    this.loadProjects();
  },

  data() {
    return {
      projects: [],
      selected: null,
    };
  },

  computed: {
    // projects() {
    //     return this.$store.state.projects;
    //   },
    selectedProject() {
      return this.$store.getters.selectedProject;
    },
  },

  methods: {
    loadProjects() {
      this.projects = [
        {
          id: 'id',
          name: 'loooooooooooooooongproject',
        },
        {
          id: 'id2',
          name: 'project',
        },
        {
          id: 'id3',
          name: 'project2',
        },
      ];
    },

    onChange() {
      const project = this.projects.find(p => p.id === this.selected);
      this.$store.dispatch('SELECT_PROJECT', { project });
    },
  },
};
</script>

<style>

</style>
