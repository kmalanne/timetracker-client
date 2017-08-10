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

  data() {
    return {
      selected: null,
    };
  },

  mounted() {
    this.loadProjects();
  },

  computed: {
    projects() {
      return this.$store.getters.projects;
    },
  },

  methods: {
    loadProjects() {
      this.$store.dispatch('LOAD_PROJECTS');
    },

    onChange() {
      const project = this.$store.getters.projects.find(p => p.id === this.selected);
      this.$store.dispatch('SELECT_PROJECT', { project });
    },
  },
};
</script>
