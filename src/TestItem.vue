<template>
  <div class="test-item">
    <span>{{item.label}}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.test-item {
  font-size: 20px;
  display: inline-block;
  height: 150px;
  width: 150px;
  border: solid 2px #ccc;
}
</style>
