<template>
<div id="app">

  <Navbar></Navbar>

  <div class="container">
    <router-view></router-view>
  </div>

</div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  data() {
    return {
      userId: null,
    }
  },
  components: {
    Navbar
  },
  methods: {},
  mounted() {},
  created() {}
}
</script>

<style src="./App.css">
</style>
