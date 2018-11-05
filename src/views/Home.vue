<template>
  <div id="home">

    <v-layout row
              class="mb-5">
      <v-flex x12>
        <h1 class="display-4 font-weight-thin text-xs-center">
          <span class="primary--text">VAC</span>
          <span>EIT</span>
        </h1>
      </v-flex>
    </v-layout>

    <v-layout row
              class="mb-5">
      <v-flex x12>
        <h1 class="display-3 font-weight-thin secondary--text font-italic text-xs-center">Check former enemy's bans</h1>
      </v-flex>
    </v-layout>

    <v-divider class="mb-5"></v-divider>

    <v-layout row
              class="mb-5"
              justify-center>
      <v-flex xs11
              md9>
        <SearchInput></SearchInput>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchInput from "@/components/SearchInput.vue";
export default {
  name: "Home",
  components: { SearchInput },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
};
</script>
