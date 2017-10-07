<template lang="html">
  <div class="reports">
    <div class="chart-row-container">

      <md-whiteframe md-tag="section" class="whiteframe-column">
        <div v-if="periodTotal === ''" class="empty-report">
          <h1>No data available for this period</h1>
        </div>
        <div v-else class="period-total">
          <h1>{{periodTotal}}</h1>
        </div>
      </md-whiteframe>

      <md-whiteframe md-tag="section" class="whiteframe-column">
        <md-list class="md-double-line">
          <md-list-item v-for="item in listData" :key="item.name">
            <div class="md-list-text-container">
              <div id="textrow">
                <p class="alignleft">{{item.name}}</p>
                <p class="alignright">{{item.elapsedTime}}</p>
              </div>
              <!-- <span> - </span> -->
              <span>{{item.url}}</span>
            </div>
          </md-list-item>
        </md-list>
      </md-whiteframe>
      
      <md-whiteframe md-tag="section" class="whiteframe-column whiteframe-column-last">
        <div class="pie">
          <pieChart :pieData="pieData"></pieChart>
        </div>
      </md-whiteframe>
    </div>

    <md-whiteframe md-tag="section" class="whiteframe-row">
      <div class="bar">
        <barChart :barData="barData"></barChart>
      </div>
    </md-whiteframe>
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
      listData: [
        {
          name: '',
          url: '',
          elapsedTime: '',
        },
      ],
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
      const reportData = this.$store.getters.reportData;

      this.periodTotal = this.getPeriodTotal(reportData);

      if (this.periodTotal !== '') {
        this.listData = this.getListData(reportData);
        this.barData = this.getBarData(reportData, range);
        this.pieData = this.getPieData(reportData);
      }
    },

    getPeriodTotal(reportData) {
      if (reportData.length === 0) {
        return '';
      }

      const total = reportData.reduce((acc, val) => acc + parseInt(val.elapsed_time, 10), 0);
      const time = formatTimeInMs(total);

      return `${time.hours}h ${time.minutes}min ${time.seconds}s`;
    },

    getListData(reportData) {
      const projectTotals = reportData.reduce((acc, val) => {
        const name = val.name;
        const url = val.url;
        const elapsedTime = parseInt(val.elapsed_time, 10);

        const idx = acc.findIndex(a => a.name === name && a.url === url);

        if (idx !== -1) {
          acc[idx].elapsedTime += elapsedTime;
        } else {
          acc.push({ name, url, elapsedTime });
        }
        return acc;
      }, []);

      const listData = projectTotals.map((p) => {
        const time = formatTimeInMs(p.elapsedTime);
        const elapsedTime = `${time.hours}h ${time.minutes}min`;

        return { name: p.name, url: p.url, elapsedTime };
      });

      return listData;
    },

    getBarData(reportData, range) {
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

      const dates = getDatesArray(range.startDate, range.endDate);

      const barData = dates.reduce((acc, val) => {
        const date = val.toISOString().split('T')[0];
        const timeEntry = timeEntryData[date] ? timeEntryData[date] : 0.5;
        acc.push({ label: date, value: timeEntry });
        return acc;
      }, []);

      return barData;
    },

    getPieData(reportData) {
      const projectTotals = reportData.reduce((acc, val) => {
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
      Object.keys(projectTotals).forEach(key =>
        pieData.push({ label: key, value: projectTotals[key] }),
      );

      return pieData;
    },
  },
};
</script>

<style scoped>
.reports {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.empty-report {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 30px;
}

.chart-row-container {
  display: flex;
  flex-direction: row;
  padding: 20px;
}

.md-whiteframe {
  padding: 10px;
  background-color: #fff;
}

.whiteframe-column {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin: 0px 10px 0px 0px;
}

.whiteframe-column-last {
  margin-right: 0px
}

.whiteframe-row {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 20px 20px 20px;
}

.period-total {
  margin: auto;
}

.md-list {
  flex-grow: 1;
}

.alignleft {
  float: left;
  margin-bottom: 0px;
}

.alignright {
  float: right;
  margin-bottom: 0px;
}
</style>
