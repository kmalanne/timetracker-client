<template lang="html">
  <div id="app">
    <navigation/>
    <section class="section">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import navigation from './components/navigation';

export default {
  name: 'app',
  components: { navigation },
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}
</style>
