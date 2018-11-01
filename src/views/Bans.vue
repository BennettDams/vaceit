<template>
  <div id="bans">

    <PageHeader title="BANS"></PageHeader>

    <v-layout row
              wrap>
      <v-flex xs12>
        <v-card color="blue-grey darken-2"
                class="white--text">
          <v-card-title primary-title>
            <div class="headline">BANNED ENEMIES:</div>
            <h1 class="ml-5 pl-5 display-2">{{ amountBannedEnemies }}</h1>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row
              wrap>
      <v-flex xs8>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="enemy in enemies"
                                     :key="enemy.id">
            <div slot="header">HEADER</div>
            <v-card>
              <v-card-text>CARD TEXT</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

    </v-layout>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader.vue";
export default {
  name: "Bans",
  components: { PageHeader },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      player: state => state.player,
      matches: state => state.matches
    }),
    ...mapGetters(["enemies", "amountBannedEnemies"])
  },
  mounted() {
    if (this.matches && this.matches.length > 0) {
      this.matches.forEach(match => {
        match.teams.teamEnemy.players.forEach(player => {
          this.fetchPlayerByAccountId(player.playerId);
        });
      });
    }
  },
  methods: {
    ...mapActions(["fetchPlayerByAccountId"])
  }
};
</script>
