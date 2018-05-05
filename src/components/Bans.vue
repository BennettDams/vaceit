<template>
<div class="bans">
  <h1>BANS</h1>
  <ul v-for="(ban, index) in bans" :key="index">
    <li>{{ ban.nickname }} {{ ban.reason }} </li>

  </ul>

</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Bans',
  props: {},
  data() {
    return {
      bans: []
    }
  },
  created() {
    this.updateJsonBans();
  },
  methods: {
    updateJsonBans() {
      setInterval(this.getJsonBans, 3000);
    },
    getJsonBans() {
      axios.get('https://api.faceit.com/core/v1/bans?limit=100&offset=0')
        .then((response) => {
          this.bans = response.data.payload;
          console.log(this.bans);
        })
        .catch((error) => {
          console.log(error);
          this.bans = "error";
        });
    }
  }
}
</script>
