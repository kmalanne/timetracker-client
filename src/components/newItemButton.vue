<template lang="html">
  <button class="new-item-btn"
    @click="click()">+
  </button>
</template>

<script>
export default {
  name: 'newItemButton',
  props: ['action', 'item'],

  methods: {
    click() {
      this.$store.dispatch(this.action, { item: this.item });
    },
  },
};
</script>

<style scoped>
.new-item-btn {
  padding-bottom: 8px;
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 50%;
  font-size: 40px;
  line-height: 0px;
  background-color: #4d2c91;
  color: #fff;
}

.new-item-btn:hover {
  background-color: #401F84;
  transition: background-color 0.2s ease-out;
}
</style>
