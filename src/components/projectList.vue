<template lang="html">
  <div class="projects-wrapper">
    <md-table-card>
      <md-toolbar>
        <h1 class="md-title">Projects</h1>
        <md-button class="md-icon-button" @click.native="onAddClick">
          <md-icon>add</md-icon>
        </md-button>

        <md-button class="md-icon-button" @click.native="onDeleteClick">
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
              <md-button class="md-icon-button" v-if="columnIndex === 'created'" @click.native="onEditClick(row)">
                <md-icon>edit</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>

    <md-dialog ref="dialog">
      <md-dialog-title>
        <span v-if="editable">Edit project</span>
        <span v-else>New project</span>
      </md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container :class="{'md-input-invalid': errors.has('name')}">
            <label for="name">Name</label>
            <md-input v-model="project.name" data-vv-name="name" v-validate name="name" data-vv-rules="required" required></md-input>
            <span class="md-error">{{ errors.first('name') }}</span>
          </md-input-container>

          <md-input-container :class="{'md-input-invalid': errors.has('url')}">
            <label for="url">URL</label>
            <md-input v-model="project.url" data-vv-name="url" v-validate name="url" data-vv-rules="url"></md-input>
            <span class="md-error">{{ errors.first('url') }}</span>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="onCancelDialogClick()">Cancel</md-button>
        <md-button type="submit" class="md-primary" @click.native="onSubmitDialogClick()">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
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
      project: {
        name: '',
        url: '',
      },
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

    onSelect(selected) {
      this.selected = selected;
    },

    onAddClick() {
      this.$refs.dialog.open();
    },

    onEditClick(project) {
      this.editable = project;
      this.project.name = project.name;
      this.project.url = project.url;
      this.$refs.dialog.open();
    },

    onDeleteClick() {
      this.selected.map(s =>
        this.$store.dispatch('DELETE_PROJECT', this.$store.getters.projectId(s.name)),
      );
    },

    async onSubmitDialogClick() {
      const result = await this.$validator.validateAll();
      if (!result) {
        // eslint-disable-next-line
        return;
      }

      if (this.editable) {
        const id = this.$store.getters.projects.find(p => p.name === (this.editable.name));
        this.$store.dispatch('UPDATE_PROJECT', { id, name: this.name, url: this.url });
      } else {
        this.$store.dispatch('CREATE_PROJECT', { name: this.name, url: this.url });
        this.projects.push({ name: this.project.name, url: this.project.url, created: new Date() });
      }

      this.closeDialog();
    },

    onCancelDialogClick() {
      this.closeDialog();
    },

    closeDialog() {
      this.editable = null;
      this.project.name = '';
      this.project.url = '';
      this.$refs.dialog.close();
    },
  },
};
</script>
