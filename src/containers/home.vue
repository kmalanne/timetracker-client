<template lang="html">
  <div class="home">
    <div class="project-select">
      <projectSelect/>
    </div>
    <div class="stopwatch">
      <stopwatch/>
    </div>
  </div>
</template>

<script>
import projectSelect from '@/components/projectSelect';
import stopwatch from '@/components/stopwatch';

export default {
  name: 'home',
  components: { projectSelect, stopwatch },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 20px;
  background-color: #fff;
}

.project-select {
  padding: 0px 30px
}

.stopwatch {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
