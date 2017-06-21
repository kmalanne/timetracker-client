<template lang="html">
  <div class="timeEntryList">
    <div class="time-entry-list-filter">
      <div class="time-entry-filter-range">
        <input class="form-control time-entry-filter-datepicker" type="date" value="2017-08-19" id="date-start">
        <input class="form-control time-entry-filter-datepicker" type="date" value="2017-08-19" id="date-end">
      </div>
      <button type="button" class="btn btn-primary btn-refresh"
        @click="refresh()">
        Refresh
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeEntryList',

  methods: {
    refresh() {

    },
  },
};
</script>

<style scoped>
.timeEntryList {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px;
  background-color: #fff;
}

.time-entry-list-filter {
  display: flex;
  flex-direction: row;
  margin: 20px;
}

.time-entry-filter-range {
  display: flex;
  flex-direction: row;
}

.time-entry-filter-datepicker {
  margin-right: 10px;
}

.btn-refresh {
  width: 140px;
  height: 40px;
  border-radius: 20px;
  background-color: #4d2c91;
  border-color: #4d2c91;
}

.btn-refresh:hover {
  background-color: #401F84;
  border-color: #401F84;
  transition: background-color 0.2s ease-out;
  transform: scale(1.05);
  transition: transform 0.3s ease-out;
}
</style>
