<template lang="html">
  <div class="reports">
    <pieChart/>
  </div>
</template>

<script>
import pieChart from '@/components/pieChart';

export default {
  name: 'reports',
  components: { pieChart },
};
</script>

<style>
.reports {
  display: flex;
  flex: 1;
  background-color: #eceff1;



  align-items: center;
  justify-content: center;
}
</style>
