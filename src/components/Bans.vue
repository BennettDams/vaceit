<template>
<div class="bans">


  <div class="section">
    <div class="row">
      <div class="col s12">
        <div class="col s12 center-align"><span class="vaceit-title">BANS</span></div>
        <div class="col s12 center-align"><i class="material-icons vaceit-title-symbol">highlight_off</i></div>
      </div>
    </div>

    <div class="row">
      <div class="col s12 center-align">
        <h3 class="vaceit-subtitle">List of banned players at FACEIT.com</h3>
      </div>
    </div>
  </div>


  <div class="section center-align">
    <div class="row">
      <div class="col s12">

        <table class="highlight responsive-table">
          <thead>
            <tr>
              <th>NICKNAME</th>
              <th></th>
              <th>BANNED SINCE</th>
              <th>REASON</th>
              <th>ENDS AT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ban, index) in bans" :key="index">
              <td><button class="btn orange darken-3">{{ ban.nickname }}</button></td>
              <td><i class="material-icons">chevron_right</i></td>
              <td><span class="chip">{{ ban.reason }}</span></td>
              <td>{{ ban.starts_at }}</td>
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
      setInterval(this.getJsonBans, 10000);
      console.log("updateJsonBans");
    },
    getJsonBans() {
      axios.get('https://api.faceit.com/core/v1/bans?limit=100&offset=0')
        .then((response) => {
          this.bans = response.data.payload;
        })
        .catch((error) => {
          console.log(error);
          this.bans = "error";
        });
    }
  }
}
</script>

<style src="./css/Bans.css" scoped>
</style>
