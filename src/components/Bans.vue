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
        <h4 class="orange-text">BANNED PLAYERS: {{ amountBans }}</h4>
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
import moment from 'moment'
export default {
  name: 'bans',
  props: {},
  data() {
    return {
      scrollPage: 0,
      bans: [],
      banAxiosLimit: 100,
      banAxiosOffset: 0,
      amountBans: 0
    }
  },
  mounted() {
    this.fetchBans();
    this.updateBans();
    this.scroll();
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.fetchBans();
        }
      };
    },
    updateBans() {
      console.log("updateJsonBans");
      setInterval(this.getJsonBans, 100000);
    },
    fetchBans() {
      axios.get('https://api.faceit.com/core/v1/bans', {
          params: {
            limit: this.banAxiosLimit,
            offset: this.banAxiosOffset
          }
        })
        .then((response) => {
          var payload = response.data.payload;
          var len = payload.length;
          if (len != 0) {
            if (this.banAxiosOffset == 0) {
              this.bans = payload;
              this.bans.forEach(function(entry) {
                entry.starts_at = moment(entry.date).format('DD | MMMM | YYYY hh:mm');
                entry.ends_at = moment(entry.date).format('DD | MMMM | YYYY hh:mm');
              }.bind(this));
            } else {
              payload.forEach(function(entry) {
                entry.starts_at = moment(entry.date).format('DD | MMMM | YYYY hh:mm');
                entry.ends_at = moment(entry.date).format('DD | MMMM | YYYY hh:mm');
                this.bans.push(entry);
              }.bind(this));
            }
            this.banAxiosOffset++;
            // this.fetchBans();
          }
          this.amountBans += len;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style src="./css/Bans.css" scoped>
</style>
