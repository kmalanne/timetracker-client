<template lang="html">
  <div id="project-list">
    <div class="project-list">
      <div class="project-item" v-for="project in projects" 
        :class="{ editing: project == editedProject }">
        <div class="view">
          <h4 @dblclick="editProject(project)">{{ project.name }}</h4>
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
    };
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
          name: 'project',
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

.project-item {
  display: flex;
  padding: 8px;
  color: #494949;
  margin: 8px;
  vertical-align: middle;
}

.project-item:hover {
  border-left: 3px solid #7e57c2;
}

.project-item .view {
  overflow: hidden;
}

.project-item .edit {
  display: none;
}

.project-item.editing .view {
  display: none;
}

.project-item.editing .edit {
  display: flex;
}

.project-item input {
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
