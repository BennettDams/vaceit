<template>
  <div id="matches">

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
  </template>

  <script>
  export default {
    name: 'matches',
    mounted() {
      this.initializeCollapsible();
    },
    methods: {
      initializeCollapsible() {
        var elem = document.querySelector('.collapsible');
        new M.Collapsible(elem, {
          accordion: false,
          inDuration: 200,
          outDuration: 200
        });
      }
    }
  }
  </script>

  <style src="./css/Matches.css">
  </style>
