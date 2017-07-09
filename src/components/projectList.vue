<template lang="html">
  <div class="projects-wrapper">
    <md-table-card>
      <md-toolbar>
        <h1 class="md-title">Projects</h1>
        <md-button class="md-icon-button" @click="onAddClick">
          <md-icon>add</md-icon>
        </md-button>

        <md-button class="md-icon-button" @click="onDeleteClick">
          <md-icon>delete</md-icon>
        </md-button>
      </md-toolbar>

      <md-table @select="onSelect">
        <md-table-header>
          <md-table-row>
            <md-table-head>Name</md-table-head>
            <md-table-head>URL</md-table-head>
            <md-table-head>Created at</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in projects" :key="rowIndex" :md-item="row" md-selection>
            <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex">
              {{ column }}
              <md-button class="md-icon-button" v-if="columnIndex === 'created'" @click="onEditClick(row)">
                <md-icon>edit</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>

    <form @submit.stop.prevent="submit" v-if="editable">
      <md-input-container>
        <label>Name</label>
        <md-input v-model="name" required></md-input>
      </md-input-container>

      <md-input-container>
        <label>URL</label>
        <md-input v-model="url"></md-input>
      </md-input-container>

      <md-button class="md-raised">Cancel</md-button>
      <md-button type="submit" class="md-raised md-primary">Save</md-button>
    </form>
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
      selected: [],
      editable: null,
      name: '',
      url: '',
    };
  },

  methods: {
    loadProjects() {
      this.projects = [
        {
          name: 'loooooooooooooooongproject',
          url: 'www.derp.com',
          created: '2017-01-01',
        },
        {
          name: 'project',
          url: 'www.derp.com',
          created: '2017-01-01',
        },
        {
          name: 'project2',
          url: 'www.derp.com',
          created: '2017-01-01',
        },
      ];
    },

    onSelect(event) {
      this.selected = event;
    },

    onAddClick() {
      this.projects.add({ name: 'derp', url: 'www.ddjdj', created: '2017-00-00' });
      // this.$store.dispatch('LOGIN', { name: 'NEW_PROJECT', url: 'URL' });
    },

    onEditClick(project) {
      this.editable = project;
      this.name = project.name;
      this.url = project.url;
    },

    onDeleteClick() {

    },
  },
};
</script>
