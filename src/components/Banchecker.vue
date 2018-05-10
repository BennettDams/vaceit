<template>
<div class="banchecker">

  <div class="container">

    <div class="section">
      <div class="row">
        <div class="col s12">
          <div class="col s12 center-align"><span id="header-banchecker">BAN CHECKER</span></div>
          <div class="col s12 center-align"><i id="header-banchecker-symbol" class="material-icons">location_searching</i></div>
        </div>
      </div>

      <div class="row">
        <div class="col s12 center-align">
          <h3>Your profile overview</h3>
        </div>
      </div>
    </div>


    <div class="section center-align">
      <div class="row">
        <div class="col s12">

          <ul class="collapsible expandable">
            <li class="active">
              <div class="collapsible-header transparent"><i class="material-icons">filter_drama</i>First</div>
              <div class="collapsible-body orange lighten-4 orange-text text-darken-4"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div class="collapsible-header transparent"><i class="material-icons">place</i>Second</div>
              <div class="collapsible-body transparent"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div class="collapsible-header transparent"><i class="material-icons">whatshot</i>Third</div>
              <div class="collapsible-body transparent"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Banchecker',
  props: {},
  data() {
    return {
      test: []
    }
  },
  mounted() {
    this.initializeCollapsible();
  },
  methods: {
    initializeCollapsible() {
      document.addEventListener('DOMContentLoaded', function() {
        var elem = document.querySelector('.collapsible');
        var instance = new M.Collapsible(elem, {
          accordion: false,
          inDuration: 200,
          outDuration: 200
        });
      });
    }
  }
}
</script>

<style src="./Banchecker.css" scoped>
</style>
