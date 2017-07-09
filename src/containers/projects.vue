<template lang="html">
  <div class="projects">
    <projectList/>
  </div>
</template>

<script>
import projectList from '@/components/projectList';

export default {
  name: 'projects',
  components: { projectList },
};
</script>

<style>
.projects {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 20px;
  padding: 30px;
  background-color: #fff;
}
</style>
