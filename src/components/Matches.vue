<template>
  <div id="matches">

    <div class="section center-align">
      <div class="row">
        <div class="col s12">

          <ul class="collapsible expandable">
            <li v-for="(match, index) in matches" :key="index">
              <div class="collapsible-header transparent"><i class="material-icons">filter_drama</i>First</div>
              <div class="collapsible-body orange lighten-4 orange-text text-darken-4"><span>{{ match.matchId }}</span></div>
            </li>
         </ul>

        </div>
      </div>
    </div>

  </div>
  </template>

  <script>
  import axios from 'axios'
  export default {
    name: 'matches',
    props: {},
    data() {
      return {
        matches: []
      }
    },
    mounted() {
      this.initializeCollapsible();
    },
    created() {
      this.fetchMatchesByUser();
    },
    methods: {
      fetchMatchesByUser() {
        axios.get('https://api.faceit.com/stats/v1/stats/time/users/a0d61b0a-3255-4269-b042-aa2c68c0fb3e/games/csgo?page=0&size=30')
          .then((response) => {
            this.matches = response.data;
            console.log(this.matches);
          })
          .catch((error) => {
            console.log(error);
            this.matches = "error";
          });
      },
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
