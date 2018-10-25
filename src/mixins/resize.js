import { throttle } from '../util'

export default {
  data () {
    return {
      resizeHandler: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.reflowLayout()
      window.addEventListener('resize', this.handleResize())
    })
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize())
  },
  methods: {
    handleResize () {
      if (!this.resizeHandler) {
        this.resizeHandler = throttle(() => this.reflowLayout(), 200, true)
      }
      return this.resizeHandler
    },
    reflowLayout () {
      throw new Error('not implemented')
    }
  }
}
