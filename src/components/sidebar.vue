<template lang="html">
  <div id="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-content">
        <div class="header">
          <h2>Projects</h2>
        </div>
        <newProjectButton/>
        <projectList/>
      </div>
    </div>
  </div>
</template>

<script>
import newProjectButton from './newProjectButton';
import projectList from './projectList';

export default {
  name: 'sidebar',
  components: { newProjectButton, projectList },
};
</script>

<style scoped>
#sidebar {
  display: flex;
}

.sidebar-wrapper {
  display: flex;
  width: 300px;
  background-color: #fff;
  color: #fff;
  margin: 20px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%
}

h2 {
  background-color: #7e57c2;
  padding-left: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
