<template>
<div id="app">

  <Navbar></Navbar>

  <router-view />

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
