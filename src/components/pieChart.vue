<template lang="html">
  <div id="pie"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'pieChart',

  data() {
    return {
      values: [
        { label: 'derp', value: 10 },
        { label: 'herp', value: 20 },
        { label: 'lurp', value: 30 },
        { label: 'lerp', value: 40 },
      ],
    };
  },

  mounted() {
    this.drawChart();
  },

  methods: {
    drawChart() {
      const width = 360;
      const height = 360;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal()
        .range(['#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60']);

      const svg = d3.select('#pie')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

      svg.selectAll('path')
        .data(pie(this.values))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.label));
    },
  },
};
</script>
