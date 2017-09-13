<template lang="html">
  <div id="bar"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'barChart',

  data() {
    return {
      values: [
        { label: 'derp', value: 10 },
        { label: 'herp', value: 0 },
        { label: 'lurp', value: 50 },
        { label: 'lerp', value: 10 },
        { label: 'durp', value: 10 },
        { label: 'nerp', value: 5 },
        { label: 'nyrp', value: 100 },
        { label: 'derp', value: 10 },
        { label: 'herp', value: 20 },
        { label: 'lurp', value: 30 },
        { label: 'lerp', value: 10 },
        { label: 'durp', value: 4 },
        { label: 'nerp', value: 10 },
        { label: 'nyrp', value: 70 },
        { label: 'derp', value: 10 },
        { label: 'herp', value: 20 },
        { label: 'lurp', value: 30 },
        { label: 'lerp', value: 90 },
        { label: 'durp', value: 10 },
        { label: 'nerp', value: 80 },
        { label: 'nyrp', value: 15 },
        { label: 'derp', value: 25 },
        { label: 'herp', value: 69 },
        { label: 'lurp', value: 30 },
        { label: 'lerp', value: 6 },
        { label: 'durp', value: 8 },
        { label: 'nerp', value: 45 },
        { label: 'nyrp', value: 60 },
      ],
    };
  },

  mounted() {
    this.drawChart();
  },

  methods: {
    drawChart() {
      // Pie
      const valueAmount = this.values.length;
      const width = 900;
      const height = 200;
      const barPadding = 2;

      const svg = d3.select('#bar')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      svg.selectAll('rect')
        .data(this.values)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * (width / valueAmount))
        .attr('y', d => height - d.value)
        .attr('width', (width / valueAmount) - barPadding)
        .attr('height', d => d.value)
        .attr('fill', '#f48fb1');
    },
  },
};
</script>

<style>

</style>
