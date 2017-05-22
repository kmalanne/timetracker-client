<template lang="html">
  <div id="home">
    <sidebar/>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar';

export default {
  name: 'home',
  components: { sidebar },
};
</script>

<style>
#home {
  display: flex;
  flex: 1;
  background-color: #eceff1;
}
</style>
