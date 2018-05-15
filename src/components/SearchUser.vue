<template>
<div class="search-user">

  <div class="section row">
    <div class="col s12">

      <form>
        <div class="input-field">
          <i class="material-icons prefix">search</i>
          <input id="search" type="tel" required @keyup.enter="searchedAccount()" v-model="username">
          <label for="search">FACEIT ID OR ACCOUNT URL</label>
        </div>
      </form>

    </div>
  </div>


</div>
</template>

<script>
import {
  store
} from '../main.js'
import axios from 'axios'
export default {
  name: 'search-user',
  data() {
    return {
      username: ''
    }
  },
  computed: {
    computedvar: function() {
      return store.accountId
    }
  },
  created() {},
  methods: {
    searchedAccount() {
      this.fetchAccountIdByUsername(this.username);
    },
    fetchAccountIdByUsername(username) {
      var faceItUrl = "faceit.com/";
      var usernameCheck = username.toLowerCase();
      if (usernameCheck.includes(faceItUrl)) {
        console.log('full url');
      }
      axios.get('https://api.faceit.com/core/v1/nicknames/' + this.username)
        .then((response) => {
          console.log('username: ' + username);
          store.accountId = response.data.payload.guid;
          console.log('store acc id: ' + store.accountId);
          this.$router.push('/stats')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style src="./css/SearchUser.css" scoped>
</style>
