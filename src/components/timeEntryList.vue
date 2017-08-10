<template lang="html">
  <md-table-card>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Project</md-table-head>
          <md-table-head>Time elapsed</md-table-head>
          <md-table-head>Start</md-table-head>
          <md-table-head>Stop</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, rowIndex) in timeEntries" :key="rowIndex">
          <md-table-cell v-if="columnIndex !== 'id' && columnIndex !== 'user'" v-for="(column, columnIndex) in row" :key="columnIndex">
          <span v-if="columnIndex === 'start_time' || columnIndex === 'stop_time'">{{ column | formatDate }}</span>
          <span v-if="columnIndex === 'elapsed_time'">{{ column | formatTime }}</span>
          <span v-if="columnIndex !== 'elapsed_time' && columnIndex !== 'start_time' && columnIndex !== 'stop_time'">{{ column }}</span>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>

    <md-table-pagination
    md-size="limit"
    md-page="page"
    md-label="Rows"
    md-separator="of"
    :md-page-options="[10, 25, 50, 100]"
    @pagination="onPagination"></md-table-pagination>
  </md-table-card>
</template>

<script>
export default {
  name: 'timeEntryList',

  mounted() {
    this.loadTimeEntries();
  },

  computed: {
    timeEntries() {
      return this.$store.getters.timeEntries;
    },

    size() {
      return this.$store.getters.size;
    },

    limit() {
      return this.$store.getters.limit;
    },

    page() {
      return this.$store.getters.page;
    },
  },

  methods: {
    loadTimeEntries() {
      this.$store.dispatch('LOAD_TIME_ENTRIES', {});
    },

    onPagination(event) {
      this.$store.dispatch('LOAD_TIME_ENTRIES', { page: event.page, limit: event.size });
    },
  },
};
</script>

<style scoped>
.md-table-card {
  width: 100%;
}

.md-table-pagination {
  flex: none;
}
</style>
