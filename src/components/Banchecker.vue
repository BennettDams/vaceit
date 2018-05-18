<template>
<div class="banchecker">

  <div class="section">
    <div class="row">
      <div class="col s12">
        <div class="col s12 center-align"><span class="vaceit-title">BAN CHECKER</span></div>
        <div class="col s12 center-align"><i class="material-icons vaceit-title-symbol">location_searching</i></div>
      </div>
    </div>

    <div class="row">
      <div class="col s12 center-align">
        <h3 class="vaceit-subtitle">Your profile overview</h3>
      </div>
    </div>
  </div>


  <div class="section center-align">
    <div class="row">
      <div class="col s12">
        <h2>STATUS: {{ fetchBansStatus }}</h2>
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
        <h2>LOADED SO FAR: {{ amountLoaded }}</h2>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'banchecker',
  props: {},
  data() {
    return {
      bans: [],
      banAxiosLimit: 100,
      banAxiosOffset: 0,
      fetchBansStatus: '',
      amountLoaded: 0
    }
  },
  mounted() {
    this.fetchBans();
  },
  methods: {
    fetchBans() {
      this.fetchBansStatus = "Loading all bans.."
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
          this.amountLoaded += len;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style src="./css/Banchecker.css" scoped>
</style>
