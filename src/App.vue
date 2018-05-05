<template>
<div id="app">
  <!-- <Home msg="Welcome to Your Vue.js App" /> -->
  <nav>
    <router-link to="/">HOME</router-link>
    <router-link to="/about">ABOUT</router-link>
  </nav>

  <router-view />
</div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style src="./App.css">
</style>
