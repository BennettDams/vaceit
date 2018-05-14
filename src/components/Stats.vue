<template>
<div class="stats">

  <div class="section">
    <div class="row">
      <div class="col s12">
        <div class="col s12 center-align"><span class="vaceit-title">STATS</span></div>
        <div class="col s12 center-align"><i class="material-icons vaceit-title-symbol">location_searching</i></div>
      </div>
    </div>

    <div class="row">
      <div class="col s12 center-align">
        <h3 class="vaceit-subtitle">Your stats</h3>
      </div>
    </div>
  </div>



  <Matches></Matches>

</div>
</template>

<script>
import Matches from './Matches.vue'
export default {
  name: 'stats',
  components: {
    Matches
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style src="./css/Stats.css" scoped>
</style>
