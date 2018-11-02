<template>
  <div id="matches">

    <PageHeader title="MATCHES"></PageHeader>

    <!-- <v-progress-linear v-if="player.player_id && isLoading"
                       color="secondary"
                       height="13"
                       :indeterminate="true">
    </v-progress-linear> -->

    <div v-if="matches.length > 0">
      <v-layout row
                wrap
                class="mb-5">

        <v-flex xs7>
          <v-card class="primary--text transparent"
                  style="background-color: rgba(100,100,100,1);">
            <v-layout>

              <v-flex xs12
                      sm6
                      md8
                      align-center
                      justify-center
                      layout
                      text-xs-center
                      class="py-3">
                <v-avatar size=120>
                  <v-img :src="player.avatar"
                         :lazy-src="player.avatar"
                         aspect-ratio="1"
                         class="grey lighten-2">
                  </v-img>
                </v-avatar>
              </v-flex>

              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="secondary--text headline my-2">{{ player.nickname }}</div>
                    <v-divider light
                               class="my-2"></v-divider>
                    <div>{{ matches.length }} MATCHES</div>
                    <div>ELO: {{ player.games.csgo.faceit_elo }}</div>
                    <div>SKILL LEVEL: {{ player.games.csgo.skill_level }}</div>
                  </div>
                </v-card-title>
              </v-flex>

              <v-flex xs7
                      align-center
                      justify-center
                      layout>
                <h1 class="mr-3 font-weight-light">LEVEL</h1>
                <v-progress-circular class="text-xs-center"
                                     :rotate="-90"
                                     :size="100"
                                     :width="15"
                                     :value="player.games.csgo.skill_level * 10"
                                     :color="faceitLevelColor">
                  <h1>{{ player.games.csgo.skill_level }}</h1>
                </v-progress-circular>
              </v-flex>

            </v-layout>
          </v-card>
        </v-flex>

      </v-layout>

      <v-layout row
                wrap>
        <v-flex xs12>

          <v-data-table ref="dTable"
                        :headers="headers"
                        :items="matches"
                        hide-actions
                        item-key="id"
                        :pagination.sync="pagination"
                        expand>
            <template slot="items"
                      slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.finishedAt }}</td>
                <td class="text-xs-center">{{ props.item.competitionName }}</td>
                <td class="text-xs-center">
                  <span v-if="props.item.map">
                    {{ props.item.map }}
                  </span>
                  <span v-else>
                    &mdash;
                  </span>
                </td>
                <td class="text-xs-center">
                  <!-- SCORE -->
                  <!-- <span v-if="props.item.matchDetails">
                    <v-chip :color="winOrLoseColor(props.item.matchDetails.teams.teamOwn.isWinner)"
                            text-color="white"
                            class="my-2 px-3">
                      {{ props.item.matchDetails.teams.teamOwn.finalScore }}
                      &ndash;
                      {{ props.item.matchDetails.teams.teamEnemy.finalScore }}
                    </v-chip>
                  </span> -->
                  <!-- <span v-else>
                    &mdash;
                  </span> -->
                </td>
                <td class="text-xs-center">
                  <v-btn color=""
                         :href="props.item.faceitMatchUrl">
                    <v-icon color="orange darken-2">gamepad</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template slot="expand"
                      slot-scope="props">
              <v-card flat>
                <v-card-text>
                  <v-layout row>
                    <!-- <v-flex xs5>
                      <p class="text-xs-center">{{ props.item.matchDetails.teams.teamOwn.name }}</p>
                    </v-flex> -->

                    <v-flex xs5
                            align-center>
                      <v-card xs3
                              class="mx-5">

                        <v-toolbar color="secondary"
                                   dark>
                          <v-toolbar-title class="text-xs-center">
                            {{ props.item.teams.teamOwn.name }}
                          </v-toolbar-title>

                          <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-list subheader>
                          <v-list-tile v-for="player in props.item.teams.teamOwn.players"
                                       :key="player.playerId"
                                       avatar>

                            <v-list-tile-avatar class="mr-2"
                                                size=45>
                              <img v-if="player.avatar"
                                   :src="player.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                              <v-list-tile-title v-html="player.nickname"></v-list-tile-title>
                            </v-list-tile-content>

                          </v-list-tile>
                        </v-list>

                        <v-divider></v-divider>

                      </v-card>
                    </v-flex>

                    <v-flex xs2
                            layout
                            align-center
                            justify-center>
                      <!-- <span :class="['display-2', 'text-xs-center', winOrLoseColor(props.item.matchDetails.teams.teamOwn.isWinner) + '--text']">
                        {{ props.item.matchDetails.teams.teamOwn.finalScore }}
                      </span>
                      <span class="display-2 mx-4">&#58;</span>
                      <span :class="['display-2', 'text-xs-center', winOrLoseColor(props.item.matchDetails.teams.teamEnemy.isWinner) + '--text']">
                        {{ props.item.matchDetails.teams.teamEnemy.finalScore }}
                      </span> -->
                    </v-flex>

                    <v-flex xs5
                            align-center
                            justify-center>
                      <v-card xs3
                              class="mx-5">

                        <v-toolbar color="secondary"
                                   dark>
                          <v-toolbar-title class="text-xs-center">
                            {{ props.item.teams.teamEnemy.name }}
                          </v-toolbar-title>

                          <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-list subheader>
                          <v-list-tile v-for="player in props.item.teams.teamEnemy.players"
                                       :key="player.playerId"
                                       avatar>
                            <v-list-tile-avatar class="mr-2"
                                                size=45>
                              <img v-if="player.avatar"
                                   :src="player.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                              <v-list-tile-title v-html="player.nickname"></v-list-tile-title>
                            </v-list-tile-content>

                          </v-list-tile>
                        </v-list>

                        <v-divider></v-divider>

                      </v-card>
                    </v-flex>

                  </v-layout>
                </v-card-text>
              </v-card>
            </template>
          </v-data-table>

          <!-- PAGINATION -->
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page"
                          :length="pages"></v-pagination>
          </div>

        </v-flex>
      </v-layout>

    </div>

    <v-alert v-else-if="!player.player_id"
             :value="true"
             color="secondary"
             type="info">
      <h1 class="font-weight-thin display-1">
        Search for a user first
      </h1>
    </v-alert>

  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import { mapState } from "vuex";
export default {
  name: "Matches",
  components: { PageHeader },
  data() {
    return {
      baseUrl: "https://open.faceit.com/data/v4/players",
      key: process.env.VUE_APP_FACEIT_API_KEY,
      search: "",
      pagination: {
        page: 1,
        rowsPerPage: 70,
        // sortBy: "date",
        descending: false
      },
      headers: [
        {
          text: "#",
          align: "center",
          // sortable: true,
          value: "id"
        },
        {
          text: "DATE",
          align: "center",
          // sortable: true,
          value: "date"
        },
        // {
        //   text: "RESULT",
        //   align: "center",
        //   // sortable: true,
        //   value: "result"
        // },
        {
          text: "GAME MODE",
          align: "center",
          // sortable: true,
          value: "gameMode"
        },
        {
          text: "MAP",
          align: "center",
          // sortable: true,
          value: "map"
        },
        {
          text: "SCORE",
          align: "center",
          // sortable: true,
          value: "score"
        },
        {
          text: "MATCH ON FACEIT",
          align: "center",
          // sortable: true,
          value: "matchOnFACEIT"
        }
      ]
    };
  },
  mounted() {
    setTimeout(this.expandFirstRow, 3000);
  },
  computed: {
    ...mapState({
      player: state => state.player,
      matches: state => state.matches
    }),
    // isLoading() {
    //   let loading = true;
    //   loading = this.matches.every(e => {
    //     !e["matchDetails"]["score"];
    //   });
    //   return loading;
    // },
    faceitLevelColor() {
      let color;
      let level = this.player.games.csgo.skill_level;
      if (level <= 4) {
        color = "success";
      } else if (level <= 7) {
        color = "info";
      } else if (level <= 9) {
        color = "primary";
      } else {
        color = "red";
      }
      return color;
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  methods: {
    winOrLoseColor(isWinner) {
      return isWinner == true ? "green" : "error";
    },
    expandFirstRow() {
      const item = this.matches[0];
      this.$set(this.$refs.dTable.expanded, item.id, true);
    }
  }
};
</script>

<style lang="scss" src="@/styles/Matches.scss">
</style>
