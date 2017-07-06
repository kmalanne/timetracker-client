<template lang="html">
  <div id="app">
    <toolbar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import toolbar from './components/toolbar';

export default {
  name: 'app',
  components: { toolbar },
};
</script>

<style>
html,
body {
  height: 100%;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%
}

.content {
  display: flex;
  flex: 1;
  background-color: #eceff1;
}
</style>
