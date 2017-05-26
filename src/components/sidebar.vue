<template lang="html">
  <div id="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <h2>Projects</h2>
          <div class="new-item-btn">
            <newItemButton action="CREATE_PROJECT" item="New project"/>
          </div>
        </div>
        <projectList/>
      </div>
    </div>
  </div>
</template>

<script>
import newItemButton from './newItemButton';
import projectList from './projectList';

export default {
  name: 'sidebar',
  components: { newItemButton, projectList },
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

.sidebar-header {
  position: relative;
}

h2 {
  background-color: #7e57c2;
  padding-left: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.new-item-btn {
  position: absolute;
  left: 33px;
  top: 74px;
  transform: translateY(-50%) translateX(-50%);
}
</style>
