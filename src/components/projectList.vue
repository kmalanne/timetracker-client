<template lang="html">
  <div id="project-list">
    <div class="project-list">
      <div class="project-list-item" v-for="project in projects" 
        :class="{ editing: project == editedProject, selected: project == selectedProject }">
        <div class="view" @click="selectProject(project)">
          <h4 @dblclick="editProject(project)">{{ project.name }}</h4>
          <h6>{{ project.url }}</h6>
        </div>
          <input class="edit" type="text"
          v-model="project.name"
          v-project-focus="project == editedProject"
          @blur="doneEdit(project)"
          @keyup.enter="doneEdit(project)"
          @keyup.esc="cancelEdit(project)">
      </div>
    </div>
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

  mounted() {
    this.loadProjects();
  },

  data() {
    return {
      projects: [],
      editedProject: null,
      selectedProject: null,
    };
  },

  methods: {
    loadProjects() {
      this.projects = [
        {
          id: 'id',
          name: 'loooooooooooooooongproject',
          url: 'https://www.url.com',
        },
        {
          id: 'id2',
          name: 'project',
          url: 'https://www.url.com',
        },
        {
          id: 'id3',
          name: 'project',
          url: 'https://www.url.com',
        },
      ];
    },

    editProject(project) {
      this.beforeEditCache = project.name;
      this.editedProject = project;
    },

    doneEdit(project) {
      if (!this.editedProject) {
        return;
      }

      this.editedProject = null;
      project.name = project.name.trim();
      if (!project.name) {
        // Delete project?
      }

      this.$store.dispatch('UPDATE_PROJECT', { project });
    },

    cancelEdit(project) {
      this.editedProject = null;
      project.name = this.beforeEditCache;
    },

    selectProject(project) {
      this.selectedProject = project;
      this.$store.dispatch('SELECT_PROJECT', { project });
    },
  },

  directives: {
    'project-focus': (el, binding) => {
      if (binding.value) {
        el.focus();
      }
    },
  },
};
</script>

<style scoped>
#project-list {
  display: flex;
}

.project-list {
  flex: 1 1 auto;
  padding: 5px;
  margin-top: 15px;
  overflow-y: auto;
  list-style-type: none;
}

.project-list-item {
  display: flex;
  padding: 3px;
  color: #494949;
  margin: 8px;
  vertical-align: middle;
  border-left: 3px solid transparent;
}

.project-list-item.selected {
  background-color: #7e57c2;
  color: #fff;
}

.project-list-item:hover {
  border-left: 3px solid #7e57c2;
}

.project-list-item .view {
  overflow: hidden;
}

.project-list-item .edit {
  display: none;
}

.project-list-item.editing .view {
  display: none;
}

.project-list-item.editing .edit {
  display: flex;
}

.project-list-item input {
  flex: 1;
  line-height: 35px;
  font-size: 23px;
  border: none;
  outline: none;
}

h4 {
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
