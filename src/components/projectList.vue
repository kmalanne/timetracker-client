<template lang="html">
  <div class="project-list">
    <div class="project-list-wrapper">
      <div class="project-list-content">
        <div class="project-list-header">
          <h2>Projects</h2>
          <button type="button" class="btn-new-project" @click="click()">+</button>
        </div>
        <div class="project-list-item-wrapper">
          <div class="project-list-item" v-for="project in projects"
            :class="{ editing: project === edited, selected: project && selectedProject && project.id === selectedProject.id }">
            <div class="view" @click="selectProject(project)">
              <h4 @dblclick="editProject(project)">{{ project.name }}</h4>
              <h6>{{ project.url }}</h6>
            </div>
              <input class="edit" type="text"
              v-model="project.name"
              v-project-focus="project == edited"
              @blur="doneEdit(project)"
              @keyup.enter="doneEdit(project)"
              @keyup.esc="cancelEdit(project)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectList',

  mounted() {
    this.loadProjects();
  },

  data() {
    return {
      projects: [],
      edited: null,
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

    click() {
      this.$store.dispatch('CREATE_PROJECT', { project: 'new project' });
    },

    editProject(project) {
      this.beforeEditCache = project.name;
      this.edited = project;
    },

    doneEdit(project) {
      if (!this.edited) {
        return;
      }

      this.edited = null;
      project.name = project.name.trim();
      if (!project.name) {
        // Delete project?
      }

      this.$store.dispatch('UPDATE_PROJECT', { project });
    },

    cancelEdit(project) {
      this.edited = null;
      project.name = this.beforeEditCache;
    },

    selectProject(project) {
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
.project-list {
  display: flex;
  flex-direction: column;
}

.project-list-wrapper {
  display: flex;
  width: 300px;
  height: 100%;
  background-color: #fff;
  color: #fff;
  margin: 20px;
}

.project-list-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.project-list-header {
  position: relative;
}

.project-list-header h2 {
  background-color: #7e57c2;
  padding: 20px 0px 20px 60px;
}

.btn-new-project {
  position: absolute;
  left: 33px;
  top: 74px;
  padding-bottom: 8px;
  background-color: #4d2c91;
  color: #fff;
  width: 50px;
  height: 50px;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 50%;
  font-size: 40px;
  line-height: 0px;
  border: none;
  outline: none;
}

.btn-new-project:hover {
  background-color: #401F84;
  transition: background-color 0.2s ease-out;
}

.project-list-item-wrapper {
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
  margin: 8px 4px;
  vertical-align: middle;
}

.project-list-item.selected {
  background-color: #7e57c2;
  color: #fff;
}

.project-list-item:not(.selected):hover {
  color: #7E57C2;
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
