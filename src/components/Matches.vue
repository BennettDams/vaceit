<template>
  <div id="matches">

    <div class="section center-align">
      <div class="row">
        <div class="col s12">

          accountId: {{ accountId }}

          <ul class="collapsible expandable">
            <li v-for="(match, index) in matches" :key="index">

              <div class="collapsible-header transparent hoverable">
                <div class="col s12">
                  <i class="material-icons left">check_circle</i>
                  <span class="chip left">{{ match.score }}</span>
                  <span class="right">{{ match.date }}</span>
                  <div class="btn orange darken-3">{{ match.map }}</div>
                </div>
              </div>

              <div class="col s12 collapsible-body deep-orange lighten-5 orange-text text-darken-4">

                <div class="col s2">
                  <h1>{{ match.ownScore }}</h1>
                </div>

                <div class="col s8 matches-collapsible-middle">

                  <div class="col s4">
                    <ul class="">
                      <li v-for="(player, index) in match.team1players" :key="index">
                        <span class="center">{{ player.nickname }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="col s4">
                    <!-- <img class="responsive-img" :src="require(`@/assets/img/maps/${match.map}_thumbnail.jpg`)" /> -->
                  </div>
                  <div class="col s4">
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
  import { store } from '../main.js'
  import axios from 'axios'
  import moment from 'moment'
  import M from 'materialize-css'
  export default {
    name: 'matches',
    components: {
    },
    data() {
      return {
        accountId: store.accountId,
        matches: [],
        matchesAxiosSize: 30,
        matchesAxiosPage: 0
      }
    },
    computed: {
      computedvar: function () {
        return store.accountId
      }
    },
    mounted() {
      this.initializeCollapsible();
      this.fetchAllMatchesByUser(this.matchesAxiosPage);
    },
    methods: {
      fetchAllMatchesByUser(page) {
        console.log("function page: " + page);
        axios.get('https://api.faceit.com/stats/v1/stats/time/users/' + this.accountId + '/games/csgo', {
            params: {
              page: this.matchesAxiosPage,
              size: this.matchesAxiosSize
            }
          })
          .then((response) => {
            var matchesAll = response.data;
            matchesAll.forEach(function(entry) {
              this.fetchMatchDetails(entry.matchId);
            }.bind(this));

            if(response.data.length != 0) {
              this.matchesAxiosPage += 1;
              this.fetchAllMatchesByUser(this.matchesAxiosPage);
            }
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
