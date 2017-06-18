<template lang="html">
  <div class="timeEntries">
    <timeEntryList/>
  </div>
</template>

<script>
import timeEntryList from '@/components/timeEntryList';

export default {
  name: 'timeEntries',
  components: { timeEntryList },
};
</script>

<style>
.timeEntries {
  display: flex;
  flex: 1;
  background-color: #eceff1;
}
</style>
