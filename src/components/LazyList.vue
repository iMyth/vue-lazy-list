<template>
  <div
    @scroll="lazyLoadHandler"
    class="lazy-list"
  >
    <div ref="lazyContainer"
      :style="{ paddingTop: paddingTop, paddingBottom: paddingBottom }"
      class="lazy-list-container"
    >
      <LazyListItem
        v-for="item in itemsPool"
        :key = item.id
      >
        <div :item="item" :is="itemTemplate" ></div>
      </LazyListItem>
    </div>
  </div>
</template>

<script>
import LazyListItem from './LazyListItem'
import { throttle } from '../util'
import resize from '../mixins/resize'

export default {
  name: 'lazy-list',
  mixins: [ resize ],
  props: {
    listData: {
      type: Array,
      default: () => [ ...Array(2000).keys() ].map(p => ({
        id: p,
        label: `test-${p}`
      }))
    },
    itemWidth: {
      type: Number,
      default: () => 200
    },
    itemHeight: {
      type: Number,
      default: () => 200
    },
    itemTemplate: {
      type: Object
    },
    itemMargin: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      cacheCount: 28,
      currentIndex: 0,
      lazyLoadHandler: null,
      lazyContainer: null,
      columnCount: 4
    }
  },
  mounted () {
    this.calcColumn()
    this.lazyLoadList()
    this.lazyLoadHandler = throttle(this.lazyLoadList, 100)
  },
  methods: {
    reflowLayout () {
      this.calcColumn()
      this.lazyLoadList()
    },
    calcColumn () {
      let $el = this.$el
      let width = $el.clientWidth
      let height = $el.clientHeight
      this.columnCount = Math.floor((width + this.itemMargin) / (this.itemWidth + this.itemMargin))
      this.cacheCount = Math.ceil((height / this.itemHeight) * (this.columnCount + 2))
    },
    lazyLoadList () {
      let lastItem = this.$refs.lazyContainer
      if (!lastItem) {
        return
      }
      let rect = lastItem.getBoundingClientRect()
      let top = rect.top * -1
      if (top < 0) {
        this.currentIndex = 0
      }
      if (top > 0) {
        this.currentIndex = Math.floor(top / this.itemHeight) * this.columnCount
      }
    },
  },
  computed: {
    itemsPool () {
      return this.listData.slice(this.currentIndex, this.currentIndex + this.cacheCount)
    },
    paddingTop () {
      return `${this.currentIndex / this.columnCount * this.itemHeight + this.cacheCount}px`
    },
    // padding bottom, should be:
    // Math.ceil(this.listData.length / 4) * line height - ((cacheCount + currentIndex)/ 4 * line height)
    paddingBottom () {
      if (this.listData.length - this.cacheCount - this.currentIndex < 0) {
        return '0px'
      }
      return `${Math.ceil((this.listData.length - this.cacheCount - this.currentIndex) / this.columnCount) * this.itemHeight}px`
    }
  },
  components: {
    LazyListItem
  }
}
</script>

<style scoped>
.lazy-list {
  font-size: 0;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.lazy-list-container {
  /* margin: 0 -20px; */
}
</style>
