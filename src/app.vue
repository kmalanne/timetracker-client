<template lang="html">
  <div id="app">
    <toolbar/>
    <div class="content">
      <router-view/>
    </div>
    <snackbar/>
  </div>
</template>

<script>
import toolbar from './components/toolbar';
import snackbar from './components/snackbar';

export default {
  name: 'app',
  components: { toolbar, snackbar },
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
