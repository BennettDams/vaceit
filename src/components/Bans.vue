<template>
<div class="bans">

  <div class="container">

    <div class="section">

      <div class="row">
        <div class="s12">
          <div class="valign-wrapper">
            <p>
              <i id="header-bans-symbol" class="material-icons">block</i>
              <span id="header-bans">BANS</span>
            </p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="s12 center-align">
          <h3>List of banned players at FACEIT.com</h3>
        </div>
      </div>
    </div>


    <div class="section center row">
      <div class="s12">

        <table class="table is-fullwidth has-background-white-ter is-hoverable has-text-centered">
          <thead>
            <tr>
              <th>NICKNAME</th>
              <th>BANNED SINCE</th>
              <th>REASON</th>
              <th>ENDS AT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ban, index) in bans" :key="index">
              <td>{{ ban.nickname }}</td>
              <td>{{ ban.starts_at }}</td>
              <td>{{ ban.reason }}</td>
              <td>{{ ban.ends_at }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>

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
    this.getJsonBans();
    this.updateJsonBans();
  },
  methods: {
    updateJsonBans() {
      // setInterval(this.getJsonBans, 3000);
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

<style src="./Bans.css" scoped>
</style>
