<template lang="html">
  <div id="project-list">
    <ul class="project-list">
      <li class="project-item" v-for="item in projects">
        <h4>{{ item.name }}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'projectList',

  // computed: {
  //   projects() {
  //     return this.$store.state.projects;
  //   },
  // },

  data() {
    return {
      projects: [],
    };
  },

  methods: {
    loadProjects() {
      this.projects = [
        {
          name: 'project',
        },
        {
          name: 'project',
        },
        {
          name: 'project',
        },
        {
          name: 'project',
        },
        {
          name: 'project',
        },
      ];
    },
  },

  mounted() {
    this.loadProjects();
  },
};
</script>

<style scoped>
#project-list {
  display: flex;
}

.project-list {
  width: 100%;
  list-style-type: none;
  padding: 5px;
}

.project-item {
  padding: 8px;
  color: #fff;
  margin: 8px;
  vertical-align: middle;
}

.project-item:hover {
  background-color: #757575;
  border-radius: 4px;
}

h4 {
  margin-bottom: 4px;
}
</style>
