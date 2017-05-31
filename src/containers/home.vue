<template lang="html">
  <div class="home">
    <projectList/>
    <stopwatch/>
  </div>
</template>

<script>
import projectList from '@/components/projectList';
import stopwatch from '@/components/stopwatch';

export default {
  name: 'home',
  components: { projectList, stopwatch },
};
</script>

<style>
.home {
  display: flex;
  flex: 1;
  background-color: #eceff1;
}
</style>
