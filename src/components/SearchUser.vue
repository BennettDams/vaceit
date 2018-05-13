<template>
<div class="search-user">

  <div class="section row">
    <div class="col s12">

      <input @click="searchUser" v-model="message" placeholder="edit me">
      <p>Message is: {{ message }}</p>

    </div>
  </div>


</div>
</template>

<script>
import { eventBus } from '../main.js'
export default {
  name: 'search-user',
  data() {
    return {
      message: ''
    }
  },
  created() {},
  methods: {
    searchUser: function() {
      console.log("test");
      // Using the service bus
      eventBus.$emit('searchUser', this.message);
    }
  }
}
</script>

<style src="./css/SearchPlayer.css" scoped>
</style>
