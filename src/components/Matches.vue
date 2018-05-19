<template>
  <div id="matches">

    <div class="section center-align">
      <div class="row">
        <div class="col s12">

          <ul class="collapsible expandable">
            <li v-for="(match, index) in matches" :key="index">

              <div class="collapsible-header transparent hoverable">
                <div class="col s12">

                  <div class="col s4">
                    <div class="btn orange darken-3 left">{{ match.map }}</div>
                  </div>

                  <div class="col s4">
                    {{ match.matchResult }}
                  </div>

                  <div class="col s2">
                    <span class="chip">{{ match.scoreTeamOwn }}</span> - <span class="chip">{{ match.scoreTeamEnemy }}</span>
                  </div>

                  <div class="col s2">
                    <span class="right">{{ match.date }}</span>
                  </div>

                </div>
              </div>

              <div class="col s12 collapsible-body deep-orange lighten-5 orange-text text-darken-4">

                <div class="col s2">
                  <h1>{{ match.scoreTeamOwn }}</h1>
                </div>

                <div class="col s8 matches-collapsible-middle">

                  <div class="col s4">
                    <ul class="">
                      <li v-for="(player, index) in match.playersTeamOwn" :key="index">
                        <span class="center">{{ player.nickname }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="col s4">
                    <!-- <img class="responsive-img" :src="require(`@/assets/img/maps/${match.map}_thumbnail.jpg`)" /> -->
                  </div>
                  <div class="col s4">
                    <ul class="">
                      <li v-for="(player, index) in match.playersTeamEnemy" :key="index">
                        <span class="center">{{ player.nickname }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col s2">
                  <h1>{{ match.scoreTeamEnemy }}</h1>
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
        accountName: store.accountName,
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
              let match = {};
              match["matchId"] = matchId;
              match["score"] = entry.i18;
              match["map"] = entry.i1;
              match["date"] = moment(entry.date).format('DD | MMMM | YYYY');

              var scores = [];
              scores[0] = match.score.split("/")[0].replace(/ /g,"");
              scores[1] = match.score.split("/")[1].replace(/ /g,"");

              var teamIdOwn;
              var teamIdEnemy;
              var ownIsTeam1 = false;
              entry.teams[0].players.forEach(function(entry) {
                if (entry.nickname == store.accountName) {
                  ownIsTeam1 = true;
                }
              });

              if (ownIsTeam1) {
                teamIdOwn = 0;
                teamIdEnemy = 1;
              } else {
                teamIdOwn = 1;
                teamIdEnemy = 0;
              }

              match["scoreTeamOwn"] = parseInt(scores[teamIdOwn]);
              match["scoreTeamEnemy"] = parseInt(scores[teamIdEnemy]);

              if (match.scoreTeamOwn > match.scoreTeamEnemy) {
                match["matchResult"] = "WIN";
                match["matchWin"] = true;
              } else {
                match["matchResult"] = "LOSS";
                match["matchWin"] = false;
              }

              match["playersTeamOwn"] = entry.teams[teamIdOwn].players;
              match["playersTeamEnemy"] = entry.teams[teamIdEnemy].players;

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
