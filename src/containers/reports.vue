<template lang="html">
  <div class="reports">
    <barChart barData="barData"></barChart>
    <pieChart pieData="pieData"></pieChart>
  </div>
</template>

<script>
import { getDatesArray, getSpiceReportingRange } from '@/util/time';
import barChart from '@/components/barChart';
import pieChart from '@/components/pieChart';

export default {
  name: 'reports',
  components: { barChart, pieChart },

  mounted() {
    const range = getSpiceReportingRange();
    this.$store.dispatch('FETCH_DATA', range);

    getDatesArray(range.startDate, range.endDate);
    const reportData = this.$store.getters.reportData;

    const barData = reportData.reduce((acc, value) => {
      console.log(acc);
      const date = value.created_at.split('T')[0];
      console.log(date);
      if (acc[date]) {
        acc[date] += value.elapsed_time;
      } else {
        acc[date] = value.elapsed_time;
      }
      return acc;
    }, {});

    console.log(barData);
  },

  data() {
    return {
      barData: [],
      pieData: [],
    };
  },
};
</script>

<style>
.reports {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 20px;
  padding: 30px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
}
</style>
