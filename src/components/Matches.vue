<template>
  <div id="matches">

    <div class="section center-align">
      <div class="row">
        <div class="col s12">

          <ul class="collapsible expandable">
            <li v-for="(match, index) in matches" :key="index">
              <div class="collapsible-header transparent">
                <div class="col s12">
                  <i class="material-icons left">check_circle</i>
                  <span class="chip left">{{ match.score }}</span>
                  <span class="center">{{ match.map }}</span>
                  <span class="right">{{ match.date }}</span>
                </div>

              </div>
              <div class="col s12 collapsible-body deep-orange lighten-5 orange-text text-darken-4">
                <div class="col s2">
                  <h1>{{ match.ownScore }}</h1>
                </div>
                <div class="col s8">
                  <span>{{ match.matchId }}</span>
                </div>
                <div class="col s2">
                  <h1>{{ match.enemyScore }}</h1>
                </div>
              </div>
            </li>
         </ul>

        </div>
      </div>
    </div>

  </div>
  </template>

  <script>
  import axios from 'axios'
  import moment from 'moment'
  // import M from '../../node_modules/materialize-css/dist/js/materialize.min.js'
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
      this.fetchAllMatchesByUser();
    },
    methods: {
      fetchAllMatchesByUser() {
        axios.get('https://api.faceit.com/stats/v1/stats/time/users/a0d61b0a-3255-4269-b042-aa2c68c0fb3e/games/csgo?page=0&size=30')
          .then((response) => {
            var matchesAll = response.data;
            matchesAll.forEach(function(entry) {
              var match = {};
              match["matchId"] = entry.matchId;
              match["score"] = entry.i18;
              match["ownScore"] = match.score.split("\/")[0].replace(/ /g,"");
              match["enemyScore"] = match.score.split("\/")[1].replace(/ /g,"");
              match["map"] = entry.i1;
              match["date"] = moment(entry.date).format('DD | MMMM | YYYY hh:mm');
              this.matches.push(match);
            }.bind(this));
          })
          .catch((error) => {
            console.log(error);
          });
      },
      fetchMatchDetails(matchId) {
        axios.get('https://api.faceit.com/stats/v1/stats/time/users/' + matchId + '/games/csgo?page=0&size=30')
          .then((response) => {
            var matchDetails = response.data;

            // this.matches.push(match);

          })
          .catch((error) => {
            console.log(error);
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
