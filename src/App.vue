<template>
  <div id="app">
    <LazyList :itemTemplate="TestItem"/>
  </div>
</template>

<script>
import LazyList from './components/LazyList'
import TestItem from './TestItem'

export default {
  name: 'app',
  data () {
    return {
      TestItem
    }
  },
  components: {
    LazyList,
    TestItem
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}
</style>
