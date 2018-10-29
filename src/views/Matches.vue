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
                  <span v-if="props.item.matchDetails">
                    {{ props.item.matchDetails.map }}
                  </span>
                  <span v-else>
                    //
                  </span>
                </td>
                <td class="text-xs-center">
                  <span v-if="props.item.matchDetails">
                    <v-chip :color="props.item.matchDetails.teams.teamOwn.winner == true ? 'green' : 'error'"
                            text-color="white"
                            class="my-2 px-3">
                      {{ props.item.matchDetails.teams.teamOwn.finalScore }}
                      &ndash;
                      {{ props.item.matchDetails.teams.teamEnemy.finalScore }}
                    </v-chip>
                  </span>
                  <span v-else>
                    //
                  </span>
                </td>
                <td class="text-xs-center">
                  <v-btn color=""
                         :href="props.item.matchUrl">
                    <v-icon color="orange darken-2">gamepad</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template slot="expand"
                      slot-scope="props">
              <v-card flat>
                <v-card-text>
                  <p class="text-xs-center">{{ props.item.matchDetails.teams.teamOwn.name }}</p>
                  <p class="text-xs-center">{{ props.item.matchDetails.teams.teamEnemy.name }}</p>
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
import { mapState, mapGetters } from "vuex";
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
    setTimeout(this.expandFirstRow, 2000);
  },
  computed: {
    ...mapState({
      player: state => state.player
    }),
    ...mapGetters(["matches"]),
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
    expandFirstRow() {
      const item = this.matches[0];
      this.$set(this.$refs.dTable.expanded, item.match_id, true);
    }
  }
};
</script>

<style>
</style>
