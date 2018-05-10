<template>
<div class="about">

  <div class="container">

    <div class="section">

      <div class="row">
        <div class="col s12">
          <div class="col s12 center-align"><span id="header-about">ABOUT</span></div>
          <div class="col s12 center-align"><i id="header-about-symbol" class="material-icons">group</i></div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="center-align">
            <h3>MADE JUST FOR FUN BY</h3>
            <h2 id="bennett">Bennett</h2>
            <!-- <i class="material-icons">location_searching</i> -->
          </div>
        </div>
      </div>

    </div>


    <div class="section center-align">
      <div class="row">
        <div class="col s12">


        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'About',
  props: {},
  data() {
    return {
      test: []
    }
  },
  created() {},
  methods: {
    updateJsonBans() {
      // setInterval(this.getJsonBans, 10000);
    },
  }
}
</script>

<style src="./About.css" scoped>
</style>
