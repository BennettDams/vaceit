<template>
<div id="app">
  <h3 class="text-center">VACEIT</h3>

  <!-- <Home msg="Welcome to Your Vue.js App" /> -->
  <nav>
    <router-link to="/">HOME</router-link>
    <router-link to="/bans">BANS</router-link>
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
