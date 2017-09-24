<template lang="html">
  <div id="pie"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'pieChart',
  props: ['pieData'],

  data() {
    return {
      values: [],
    };
  },

  watch: {
    pieData() {
      this.values = this.pieData;
      if (this.values.length !== 0) {
        this.drawChart();
      }
    },
  },

  methods: {
    drawChart() {
      // Pie
      const width = 360;
      const height = 360;
      const radius = Math.min(width, height) / 2;
      const innerWidth = 60;

      const color = d3.scaleOrdinal()
        .range(['#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60']);

      const svg = d3.select('#pie')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const arc = d3.arc()
        .innerRadius(radius - innerWidth)
        .outerRadius(radius);

      const pie = d3.pie()
        .sort(null)
        .startAngle(1.1 * Math.PI)
        .endAngle(3.1 * Math.PI)
        .value(d => d.value);

      const g = svg.selectAll('path')
        .data(pie(this.values))
        .enter()
        .append('g')
        .attr('d', arc);

      g.append('path')
        .style('fill', d => color(d.data.label))
        .transition()
        .delay((d, i) => i * 100)
        .duration(100)
        .attrTween('d', (d) => {
          const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
          return (t) => {
            d.endAngle = i(t);
            return arc(d);
          };
        });

      // Legend
      const legendRectSize = 15;
      const legendSpacing = 4;

      const legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
          const legendHeight = legendRectSize + legendSpacing;
          const offset = legendHeight * (color.domain().length / 2);
          const horizontal = -5 * legendRectSize;
          const vertical = (i * legendHeight) - offset;
          return `translate(${horizontal},${vertical})`;
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(d => d);
    },
  },
};
</script>

<style>
.legend {
  font-size: 12px;
  font-style: normal;
}

rect {
  stroke-width: 2;
}
</style>
