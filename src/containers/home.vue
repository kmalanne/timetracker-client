<template lang="html">
  <div id="home">
    <projects/>
  </div>
</template>

<script>
import projects from '@/components/projects';

export default {
  name: 'home',
  components: { projects },
};
</script>

<style>
#home {
  display: flex;
  flex: 1;
}
</style>
