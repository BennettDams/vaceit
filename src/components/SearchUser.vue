<template>
<div class="search-user">

  <div class="section row">
    <div class="col s12">

      <input @keyup.enter="accountSearched()" v-model="accountId" placeholder="edit me">
      <p>Message is: {{ accountId }}</p>

    </div>
  </div>


</div>
</template>

<script>
export default {
  name: 'search-user',
  data() {
    return {
      accountId: null
    }
  },
  created() {},
  methods: {
    accountSearched() {
      console.log("account searched: " + this.accountId);
    }
  }
}
</script>

<style src="./css/SearchUser.css" scoped>
</style>
