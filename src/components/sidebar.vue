<template lang="html">
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-content">
        <projectList/>
      </div>
    </div>
  </div>
</template>

<script>
import projectList from './projectList';
import stopwatch from './stopwatch';

export default {
  name: 'sidebar',
  components: { projectList, stopwatch },
};
</script>

<style scoped>
.sidebar {
  display: flex;
}

.sidebar-wrapper {
  display: flex;
  width: 300px;
  background-color: #fff;
  color: #fff;
  margin: 20px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%
}
</style>
