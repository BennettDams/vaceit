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
                  <div class="col s5">
                    <ul class="">
                      <li v-for="(player, index) in match.team1players" :key="index">
                        <span class="center">{{ player.nickname }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="col s2">

                  </div>
                  <div class="col s5">
                    <ul class="">
                      <li v-for="(player, index) in match.team2players" :key="index">
                        <span class="center">{{ player.nickname }}</span>
                      </li>
                    </ul>
                  </div>
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
  import M from 'materialize-css'
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
              this.fetchMatchDetails(entry.matchId);
            }.bind(this));
            console.log(this.matches);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      fetchMatchDetails(matchId) {
        axios.get('https://api.faceit.com/stats/v1/stats/matches/' + matchId)
          .then((response) => {
            var matchDetails = response.data;
            matchDetails.forEach(function(entry) {
              var match = {};
              match["matchId"] = matchId;
              match["score"] = entry.i18;
              match["ownScore"] = match.score.split("/")[0].replace(/ /g,"");
              match["enemyScore"] = match.score.split("/")[1].replace(/ /g,"");
              match["map"] = entry.i1;
              match["date"] = moment(entry.date).format('DD | MMMM | YYYY hh:mm');

              match["team1"] = entry.teams[0];
              match["team2"] = entry.teams[1];
              match["team1players"] = entry.teams[0].players;
              match["team2players"] = entry.teams[1].players;

              match["team1player1"] = entry.teams[0].players[0];
              match["team1player2"] = entry.teams[0].players[1];
              match["team1player3"] = entry.teams[0].players[2];
              match["team1player4"] = entry.teams[0].players[3];
              match["team1player5"] = entry.teams[0].players[4];
              match["team2player1"] = entry.teams[1].players[0];
              match["team2player2"] = entry.teams[1].players[1];
              match["team2player3"] = entry.teams[1].players[2];
              match["team2player4"] = entry.teams[1].players[3];
              match["team2player5"] = entry.teams[1].players[4];
              this.matches.push(match);
            }.bind(this));
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
