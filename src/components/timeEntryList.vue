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

  data() {
    return {
      timeEntries: [],
    };
  },

  computed: {
    // timeEntries() {
    //     return this.$store.getters.timeEntries;
    //   },
  },

  methods: {
    loadTimeEntries() {
      this.timeEntries = [
        {
          project: 'loooooooooooooooongproject',
          elapsedTime: 'elapsed',
          startTime: 'start',
          stopTime: 'stop',
        },
        {
          name: 'project',
          elapsedTime: 'elapsed',
          startTime: 'start',
          stopTime: 'stop',
        },
        {
          name: 'project2',
          elapsedTime: 'elapsed',
          startTime: 'start',
          stopTime: 'stop',
        },
      ];
    },
  },
};
</script>
