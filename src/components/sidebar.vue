<template lang="html">
  <div id="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-content">
        <projectList/>
      </div>
    </div>
  </div>
</template>

<script>
import projectList from './projectList';

export default {
  name: 'sidebar',
  components: { projectList },
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
  width: 100%
}
</style>
