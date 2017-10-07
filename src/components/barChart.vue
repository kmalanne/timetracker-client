<template lang="html">
  <div id="bar" ref="barr"></div>
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
      const { width, height } = this.updateDimensions();

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
        .attr('y', height)
        .attr('height', 0)
        .attr('x', d => x(d.label))
        .attr('width', x.bandwidth())
        .style('fill', '#f48fb1')
        .transition()
        .duration(700)
        .attr('height', height)
        .attr('y', d => y(d.value))
        .style('fill', '#f48fb1');
    },

    updateDimensions() {
      const top = 20;
      const right = 50;
      const left = 50;
      const bottom = 20;

      const width = window.innerWidth - left - right;
      const height = 350 - top - bottom;

      return { width, height };
    },
  },
};
</script>
