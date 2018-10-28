<template>
  <div id="bans">

    <PageHeader title="BANS"></PageHeader>

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
                  <div>{{ enemies.length }} ENEMIES</div>
                  <div>ELO: {{ player.games.csgo.faceit_elo }}</div>
                  <div>SKILL LEVEL: {{ player.games.csgo.skill_level }}</div>
                </div>
              </v-card-title>
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
                      :items="enemies"
                      hide-actions
                      item-key="id"
                      :pagination.sync="pagination"
                      expand>
          <template slot="items"
                    slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td class="text-xs-center">{{ props.item.id }}</td>
              <td class="text-xs-center">{{ props.item.teams.team1.nickname }}</td>
              <td class="text-xs-center">{{ props.item.teams.team1.nickname }}</td>
            </tr>
          </template>
          <template slot="expand"
                    slot-scope="props">
            <v-card flat>
              <v-card-text>Peek-a-boo!</v-card-text>
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
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader.vue";
export default {
  name: "Bans",
  components: { PageHeader },
  data() {
    return {
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
          text: "FACTION 1",
          align: "center",
          // sortable: true,
          value: "faction1"
        },
        {
          text: "FACTION 2",
          align: "center",
          // sortable: true,
          value: "faction2"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      player: state => state.player
    }),
    ...mapGetters(["enemies"]),
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
  }
};
</script>
