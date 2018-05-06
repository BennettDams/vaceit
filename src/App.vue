<template>
<div id="app">

  <!-- <Home msg="Welcome to Your Vue.js App" /> -->
  <nav>

  </nav>

  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-menu">
    <router-link to="/" class="navbar-item">HOME</router-link>
    <router-link to="/bans" class="navbar-item">BANS</router-link>
    <router-link to="/about" class="navbar-item">ABOUT</router-link>
  </div>
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
  },
  methods: {
    myFunction() {
      setInterval(this.alertFunc, 3000);
    },
    alertFunc() {
      // alert("Hello!");
    }
  },
  created() {
    this.myFunction();
  }
}
</script>

<style src="./App.css">
</style>
