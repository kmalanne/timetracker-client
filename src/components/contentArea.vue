<template lang="html">
  <div class="content-area">
    <stopwatch/>
  </div>
</template>

<script>
import stopwatch from './stopwatch';

export default {
  name: 'contentArea',
  components: { stopwatch },
};
</script>

<style scoped>
.content-area {
  display: flex;
  flex: 1;
}
</style>
