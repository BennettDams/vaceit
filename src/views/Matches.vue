<template>
  <div id="matches">

    <ViewHeader title="MATCHES"></ViewHeader>

    <v-layout row
              wrap>
      <v-flex xs12>
        <v-avatar size=120>
          <v-img :src="player.avatar"
                 :lazy-src="player.avatar"
                 aspect-ratio="1"
                 class="grey lighten-2">
          </v-img>
        </v-avatar>
        <p class="">{{ player.nickname }}</p>
        <p class=" ">{{ matches.length }} MATCHES</p>
      </v-flex>
    </v-layout>

    <v-layout row
              wrap>
      <v-flex xs12>

        <v-data-table :headers="headers"
                      :items="matches"
                      :search="search"
                      :pagination.sync="pagination"
                      hide-actions
                      class="elevation-1">
          <template slot="headerCell"
                    slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items"
                    slot-scope="props">

            <td class="text-xs-center">{{ props.index +1 }}</td>
            <td class="text-xs-center">{{ props.item.started_at | dateFromUnix }}</td>
            <td class="text-xs-center">{{ props.item.competition_name }}</td>
            <td class="text-xs-center">
              <v-btn color=""
                     :href="fixFaceitUrl(props.item.faceit_url)">
                <v-icon color="orange darken-2">gamepad</v-icon>
              </v-btn>
            </td>

          </template>
        </v-data-table>
        <div class="
                     text-xs-center
                     pt-2">
          <v-pagination v-model="pagination.page"
                        :length="pages"></v-pagination>
        </div>

      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import axios from "axios";
import format from "date-fns/format";
import addSeconds from "date-fns/add_seconds";
import ViewHeader from "@/components/ViewHeader.vue";
import { mapState } from "vuex";
export default {
  name: "Matches",
  components: { ViewHeader },
  data() {
    return {
      baseUrl: "https://open.faceit.com/data/v4/players",
      key: process.env.VUE_APP_FACEIT_API_KEY,
      search: "",
      pagination: {
        page: 1,
        rowsPerPage: 70
      },
      selected: [],
      headers: [
        {
          text: "#",
          align: "center",
          sortable: true,
          value: "match_id"
        },
        {
          text: "DATE",
          align: "center",
          sortable: true,
          value: "match_id"
        },
        {
          text: "GAME MODE",
          align: "center",
          sortable: true,
          value: "match_id"
        },
        {
          text: "MATCH URL",
          align: "center",
          sortable: true,
          value: "match_id"
        }
      ]
    };
  },
  mounted() {
    if (this.player.player_id) {
      this.fetchMatches();
    }
  },
  filters: {
    dateFromUnix: function(value) {
      if (!value) return "";
      value = format(addSeconds(new Date(0), value), "YYYY-MM-DD hh:mm");
      return value;
    }
  },
  computed: {
    ...mapState({
      player: state => state.player,
      matches: state => state.matches
    }),
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
    fixFaceitUrl(url) {
      return url.replace("{lang}", "en");
    },
    async fetchMatches() {
      console.log("fetching matches");
      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + this.key
        },
        params: {
          from: 1293840000,
          game: "csgo",
          offset: 0,
          limit: 100
        }
      };

      let url = this.baseUrl + "/" + this.player.player_id + "/history";

      try {
        const response = await axios.get(url, config);
        this.setMatchesRaw(response.data.items);
      } catch (error) {
        console.error(error);
      }
    },
    setMatchesRaw(matches) {
      this.$store.dispatch("setMatchesRaw", matches);
    }
  }
};
</script>

<style>
</style>
