<template>
<div class="search-user">

  <div class="section row">
    <div class="col s12">
      SHEIX: a0d61b0a-3255-4269-b042-aa2c68c0fb3e
      <input @keyup.enter="searchedAccount()" v-model="accountId" placeholder="edit me">
      <p>Message is: {{ accountId }}</p>

    </div>
  </div>


</div>
</template>

<script>
import { store } from '../main.js'
export default {
  name: 'search-user',
  data() {
    return {
      accountId: store.accountId
    }
  },
  computed: {
    computedvar: function () {
      return store.accountId
    }
  },
  created() {},
  methods: {
    searchedAccount() {
      store.accountId = this.accountId;
      this.$router.push('/stats')
    }
  }
}
</script>

<style src="./css/SearchUser.css" scoped>
</style>
