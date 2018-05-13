<template>
<div id="app">

  <Navbar></Navbar>

  <div class="container">
    <router-view />
  </div>

</div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  },
  methods: {
  },
  created() {
  }
}
</script>

<style src="./App.css">
</style>
