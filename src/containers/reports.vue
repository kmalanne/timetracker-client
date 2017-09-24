<template lang="html">
  <div class="reports">
    <div class="chartContainer">
      <div class="h2">
        {{periodTotal}}
      </div>
      <div class="pie">
        <pieChart :pieData="pieData"></pieChart>
      </div>
    </div>
    <div class="bar">
      <barChart :barData="barData"></barChart>
    </div>
  </div>
</template>

<script>
import { getDatesArray, getSpiceReportingRange, formatTimeInMs } from '@/util/time';
import barChart from '@/components/barChart';
import pieChart from '@/components/pieChart';

export default {
  name: 'reports',
  components: { barChart, pieChart },

  data() {
    return {
      periodTotal: '',
      barData: [],
      pieData: [],
    };
  },

  beforeMount() {
    this.initializeData();
  },

  methods: {
    async initializeData() {
      const range = getSpiceReportingRange();
      await this.$store.dispatch('FETCH_REPORT_DATA', range);
      this.periodTotal = this.calculatePeriodTotal();
      this.barData = this.calculateBarData(range);
      this.pieData = this.calculatePieData();
    },

    calculatePeriodTotal() {
      const reportData = this.$store.getters.reportData;

      const total = reportData.reduce((acc, val) => acc + parseInt(val.elapsed_time, 10), 0);

      const time = formatTimeInMs(total);

      return `${time.hours}h ${time.minutes}min ${time.seconds}s`;
    },

    calculateBarData(range) {
      const dates = getDatesArray(range.startDate, range.endDate);

      const reportData = this.$store.getters.reportData;

      const timeEntryData = reportData.reduce((acc, val) => {
        const date = val.created_at.split('T')[0];
        const elapsedTime = parseInt(val.elapsed_time, 10) / 1000;

        if (acc[date]) {
          acc[date] += elapsedTime;
        } else {
          acc[date] = elapsedTime;
        }
        return acc;
      }, {});

      const barData = dates.reduce((acc, val) => {
        const date = val.toISOString().split('T')[0];
        const timeEntry = timeEntryData[date] ? timeEntryData[date] : 0.1;
        acc.push({ label: date, value: timeEntry });
        return acc;
      }, []);

      return barData;
    },

    calculatePieData() {
      const reportData = this.$store.getters.reportData;

      const projectData = reportData.reduce((acc, val) => {
        const name = val.name;
        const elapsedTime = parseInt(val.elapsed_time, 10) / 1000;

        if (acc[name]) {
          acc[name] += elapsedTime;
        } else {
          acc[name] = elapsedTime;
        }
        return acc;
      }, {});

      const pieData = [];
      Object.keys(projectData).forEach(key =>
        pieData.push({ label: key, value: projectData[key] }),
      );

      return pieData;
    },
  },
};
</script>

<style>
.reports {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 20px;
  background-color: #fff;
}

.chartContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 30px;
}
</style>
