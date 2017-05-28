<template lang="html">
  <div class="home">
    <sidebar/>
    <contentArea/>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar';
import contentArea from '@/components/contentArea';

export default {
  name: 'home',
  components: { sidebar, contentArea },
};
</script>

<style>
.home {
  display: flex;
  flex: 1;
  background-color: #eceff1;
}
</style>
