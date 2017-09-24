<template lang="html">
  <div id="bar"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'barChart',
  props: ['barData'],

  data() {
    return {
      values: [],
    };
  },

  watch: {
    barData() {
      this.values = this.barData;
      if (this.values.length !== 0) {
        this.drawChart();
      }
    },
  },

  methods: {
    drawChart() {
      const width = 900;
      const height = 200;

      const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.05);
      const y = d3.scaleLinear()
        .range([height, 0]);

      const svg = d3.select('#bar')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g');

      x.domain(this.values.map(v => v.label));
      y.domain([0, d3.max(this.values, v => v.value)]);

      svg.selectAll('bar')
        .data(this.values)
        .enter()
        .append('rect')
        .style('fill', '#f48fb1')
        .attr('x', d => x(d.label))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value));
    },
  },
};
</script>
