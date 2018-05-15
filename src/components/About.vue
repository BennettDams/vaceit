<template>
<div class="about">

    <div class="section">

      <div class="row">
        <div class="col s12">
          <div class="col s12 center-align"><span class="vaceit-title">ABOUT</span></div>
          <div class="col s12 center-align"><i class="material-icons vaceit-title-symbol">group</i></div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="center-align">
            <h3>MADE FOR FUN BY</h3>
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
</template>

<script>
export default {
  name: 'about',
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

<style src="./css/About.css" scoped>
</style>
