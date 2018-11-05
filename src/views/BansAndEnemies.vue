<template>
    <div id="bans-and-enemies">

        <PageHeader title="BANS &amp; ENEMIES"></PageHeader>

        <v-layout align-center>
            <v-flex xs12>
                <v-progress-circular v-if="isFetchingBans"
                                     :size="120"
                                     :width="7"
                                     color="secondary"
                                     indeterminate>
                </v-progress-circular>
                <v-layout v-else
                          justify-space-around
                          class="mb-2">
                    <span class="group pa-2">
                        <v-icon color="success">check_circle</v-icon>
                        <p>ALL BANS LOADED :)</p>
                    </span>

                </v-layout>
            </v-flex>
        </v-layout>

        <div v-if="enemiesChunked.length > 0">

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
                                    <v-img :src="user.avatar"
                                           :lazy-src="user.avatar"
                                           aspect-ratio="1"
                                           class="grey lighten-2">
                                    </v-img>
                                </v-avatar>
                            </v-flex>

                            <v-flex xs7>
                                <v-card-title primary-title>
                                    <div>
                                        <div class="secondary--text headline my-2">{{ user.nickname }}</div>
                                        <v-divider light
                                                   class="my-2"></v-divider>
                                        <div>{{ matches.length }} MATCHES</div>
                                        <div>ELO: {{ user.games.csgo.faceit_elo }}</div>
                                        <div>SKILL LEVEL: {{ user.games.csgo.skill_level }}</div>
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
                                                     :value="user.games.csgo.skill_level * 10"
                                                     :color="faceitLevelColor">
                                    <h1>{{ user.games.csgo.skill_level }}</h1>
                                </v-progress-circular>
                            </v-flex>

                        </v-layout>
                    </v-card>
                </v-flex>

            </v-layout>

            <v-layout align-center>
                <v-card id="card-grid">
                    <v-container fluid
                                 grid-list-md>
                        <v-layout row
                                  wrap>
                            <v-flex xs2
                                    v-for="enemy in enemiesChunked"
                                    :key="enemy.playerId"
                                    class="mx-3 my-2">

                                <v-card>
                                    <v-img :src="enemy.avatar"
                                           aspect-ratio="1">

                                        <v-container fill-height
                                                     fluid
                                                     pa-2>
                                            <v-layout fill-height>
                                                <v-flex xs12
                                                        align-end
                                                        flexbox>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-img>

                                    <v-flex xs4>
                                        <v-card-title primary-title
                                                      class="py-1">
                                            <div>
                                                <h3 class="text-truncaste mb-0">{{ enemy.nickname }}</h3>
                                                <div>enemy</div>
                                            </div>
                                        </v-card-title>
                                    </v-flex>

                                    <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                  </v-card-actions> -->

                                </v-card>

                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-layout>

        </div>

        <v-alert v-else
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
import { mapState, mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader.vue";
export default {
  name: "Enemies",
  components: { PageHeader },
  data() {
    return {
      enemiesChunked: [],
      chunkSize: 50
    };
  },
  mounted() {
    this.addChunks();
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.addChunks();
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      matches: state => state.matches,
      isFetchingBans: state => state.isFetchingBans
    }),
    ...mapGetters(["enemies"]),
    faceitLevelColor() {
      let color;
      let level = this.user.games.csgo.skill_level;
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
    }
  },
  methods: {
    addChunks() {
      let len = this.enemiesChunked.length;
      this.enemiesChunked.push(
        ...this.enemies.slice(len, len + this.chunkSize)
      );
    }
  }
};
</script>

<style lang="scss" src="@/styles/BansAndEnemies.scss">
</style>
