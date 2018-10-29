<template>
  <v-form @submit.prevent>
    <v-layout row
              align-center>

      <v-flex sm11>

        <v-text-field @keyup.enter.native="onInputEnter()"
                      v-model="searchInput"
                      :rules="searchInputRules"
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
import InfoDialog from "@/components/InfoDialog.vue";
import { setTimeout } from "timers";
export default {
  name: "SearchInput",
  components: { InfoDialog },
  data() {
    return {
      dialogInfo: false,
      searchInput: "SHEIX",
      searchInputRules: [
        v => !!v || "Input something you doofus",
        v => v.length <= 12 || "Names must be between 3 and 12 characters"
      ]
    };
  },
  mounted() {
    this.$store.dispatch("fetchAccountIdByName", this.searchInput);
    setTimeout(this.fetchMatches, 1000);
  },
  methods: {
    onInputEnter() {
      this.$store.dispatch("fetchAccountIdByName", this.searchInput);
      setTimeout(this.fetchMatches, 1000);
      this.$router.push("/matches");
    },
    fetchMatches() {
      this.$store.dispatch("fetchMatches");
    }
  }
};
</script>

<style>
</style>
