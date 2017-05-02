<template lang="html">
  <div id="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-content">
        <projectInput/>
        <projectList/>
      </div>
    </div>
  </div>
</template>

<script>
import projectInput from './projectInput';
import projectList from './projectList';

export default {
  name: 'sidebar',
  components: { projectInput, projectList },
};
</script>

<style scoped>
#sidebar {
  display: flex;
}

.sidebar-wrapper {
  display: flex;
  width: 300px;
  background-color: #292b2c;
  margin: 20px;
  border-radius: 5px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%
}
</style>
