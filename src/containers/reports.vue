<template lang="html">
  <div class="reports">
    <report/>
  </div>
</template>

<script>
import report from '@/components/report';

export default {
  name: 'reports',
  components: { report },
};
</script>

<style>
.reports {
  display: flex;
  flex: 1;
  background-color: #eceff1;
}
</style>
