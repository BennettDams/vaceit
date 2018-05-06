<template>
<div class="bans">

  <section class="hero">
    <div class="hero-body">
      <div class="container">

        <div class="columns is-centered">
          <div class="column has-text-centered">
            <h1 class="title has-text-white is-size-1 has-text-weight-bold">BANS</h1>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column has-text-centered">
            <h2 class="subtitle has-text-white is-size-2">List of banned players from FACEIT.com</h2>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section>
    <div class="columns is-centered">
      <div class="column is-8">

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
  </section>

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
