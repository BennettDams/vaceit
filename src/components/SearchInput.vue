<template>
  <v-form @submit.prevent>
    <v-layout row
              align-center>

      <v-flex sm11>

        <v-text-field @keyup.enter.native="onInputEnter()"
                      v-model="searchInput"
                      :rules="searchInputRules"
                      label="   "
                      prepend-icon="search"
                      clearable
                      hint="FACEIT username or account URL"
                      required>
        </v-text-field>
      </v-flex>

      <v-flex sm1
              class="pl-3">

        <InfoDialog></InfoDialog>

      </v-flex>

    </v-layout>
  </v-form>
</template>

<script>
import axios from "axios";
import InfoDialog from "@/components/InfoDialog.vue";
export default {
  name: "SearchInput",
  components: { InfoDialog },
  data() {
    return {
      url: "https://open.faceit.com/data/v4/players",
      key: process.env.VUE_APP_FACEIT_API_KEY,
      axiosInstance: {},
      dialogInfo: false,
      searchInput: "",
      searchInputRules: [
        v => !!v || "Input something you doofus",
        v => v.length <= 12 || "Names must be between 3 and 12 characters"
      ]
    };
  },
  methods: {
    onInputEnter() {
      this.fetchAccountIdFromAPI();
    },
    async fetchAccountIdFromAPI() {
      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + this.key
        },
        params: {
          nickname: this.searchInput,
          game: "csgo"
        }
      };

      try {
        const response = await axios.get(this.url, config);
        console.log("fetchAccountIdFromAPI", response.data);
        this.setPlayer(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    setPlayer(player) {
      this.$store.dispatch("setPlayer", player);
    }
  }
};
</script>

<style>
</style>
