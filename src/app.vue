<template lang="html">
  <div id="app">
    <navbar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar';

export default {
  name: 'app',
  components: { navbar },
};
</script>

<style>
html,
body {
  height: 100%;
  box-sizing: border-box;
}

.content {
  display: flex;
  height: calc(100vh - 56px);
}
</style>
