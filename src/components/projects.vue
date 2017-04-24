<template lang="html">
  <div id="projects">
    <div class="sidebar-wrapper">
      <div class="sidebar">
        <ul class="project-list">
          <li class="project-item" v-for="item in projects">
            <h4>{{ item.name }}</h4>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'projects',

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
      // this.projects = axios.get('/project')
      //   .then(response => response.body)
      //   .catch(err => err);
    },
  },

  mounted() {
    this.loadProjects();
  },
};
</script>

<style scoped>
#projects {
  display: flex;
}

.sidebar-wrapper {
  display: flex;
  width: 300px;
  background-color: #292b2c;
  margin: 20px;
  border-radius: 5px;
}

.sidebar {
  width: 100%
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
