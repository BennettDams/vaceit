<template>
  <div id="search-input">

    <v-form @submit.prevent>
      <v-layout row
                align-center
                justify-center
                layout>

        <v-flex sm11>

          <v-text-field @keyup.enter.native="onInputEnter()"
                        class="font-weight-thin display-1"
                        height="40"
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

  </div>
</template>

<script>
import InfoDialog from "@/components/InfoDialog.vue";
export default {
  name: "SearchInput",
  components: { InfoDialog },
  data() {
    return {
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
      this.$store.dispatch("fetchAccountIdByName", this.searchInput);
      setTimeout(this.$router.push("/matches"), 1000);
      // setTimeout(this.fetchBans, 1000);
    },
    fetchBans() {
      this.$store.dispatch("fetchBans", 0);
    }
  }
};
</script>

<style>
</style>
