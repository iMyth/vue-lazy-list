<template>
  <div
    class="lazy-list-item"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: Number,
      default: () => 200
    },
    width: {
      type: Number,
      default: () => 200
    }
  },
  computed: {
    itemStyle () {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`
      }
    }
  }
}
</script>

<style scoped>
.lazy-list-item {
  display: inline-block;
  height: 200px;
  width: 200px;
  /* margin: 0 20px; */
  will-change: scroll-position;
}
</style>
