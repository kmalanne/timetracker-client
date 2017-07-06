<template lang="html">
  <div class="reports">
    <timeEntryList/>
  </div>
</template>

<script>
import timeEntryList from '@/components/timeEntryList';

export default {
  name: 'reports',
  components: { timeEntryList },
};
</script>

<style>
.reports {
  display: flex;
  flex: 1;
  background-color: #eceff1;
}
</style>
