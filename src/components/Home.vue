<template>
<div class="home">

  <div class="section center">
    <div class="row">
      <div class="col s12">
        <p>
          <span id="header-vac">VAC</span>
          <span id="header-it">EIT</span>
        </p>
        <h3>Check out former enemy's bans</h3>
      </div>
    </div>
  </div>

  <SearchUser :selectedOption="selectedOption"></SearchUser>

  {{ user }}

</div>
</template>


<script>
import { eventBus } from '../main.js'
import SearchUser from './SearchUser.vue'
export default {
  name: 'home',
  components: {
    SearchUser
  },
  data() {
    return {
      selectedOption: 'test',
      user: null,
    }
  },
  created() {
    // using the event busu
    eventBus.$on('searchUser', (user) => {
      this.user = user;
    });
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./css/Home.css" scoped>
</style>
