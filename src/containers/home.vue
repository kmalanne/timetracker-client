<template lang="html">
  <div class="home">
    <div class="content-wrapper">
      <div class="project-select">
        <projectSelect/>
      </div>
      <div class="stopwatch">
        <stopwatch/>
      </div>
    </div>
    <div class="time-entry-list">
      <timeEntryList/>
    </div>
  </div>
</template>

<script>
import projectSelect from '@/components/projectSelect';
import stopwatch from '@/components/stopwatch';
import timeEntryList from '@/components/timeEntryList';

export default {
  name: 'home',
  components: { projectSelect, stopwatch, timeEntryList },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 20px;
  padding: 30px;
  background-color: #fff;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
}

.project-select {
  flex: 2;
  padding: 0px 30px
}

.stopwatch {
  display: flex;
  padding-right: 30px;
  align-items: center;
  justify-content: center;
}

.time-entry-list {
  margin-top: 30px;
}
</style>
