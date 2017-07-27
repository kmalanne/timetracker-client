<template lang="html">
  <md-table-card>
    <md-table>
      <md-table-body>
        <md-table-row v-for="(row, rowIndex) in timeEntries" :key="rowIndex">
          <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex">
            {{ column }}
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
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
  },

  methods: {
    loadTimeEntries() {
      this.$store.dispatch('LOAD_TIME_ENTRIES');
    },
  },
};
</script>
