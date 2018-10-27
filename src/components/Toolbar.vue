<template>
  <v-toolbar app
             fixed>

    <!-- <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon> -->

    <v-toolbar-title>
      <h1 class="display-2 font-weight-thin">VACEIT</h1>

    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>

      <v-btn v-if="player.avatar">
        <v-avatar justify-center
                  :title="player.nickname"
                  size="40px">
          <img :src="player.avatar"
               alt="avatar">
        </v-avatar>
      </v-btn>

      <v-btn flat>username: {{ player.nickname }}</v-btn>
      <v-btn flat>account id: {{ player.player_id }}</v-btn>
      <v-btn to="/"
             flat>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn to="/bans"
             flat>BANS</v-btn>
      <v-btn to="/matches"
             flat>MATCHES</v-btn>
      <v-btn to="/about"
             flat>ABOUT</v-btn>

    </v-toolbar-items>

  </v-toolbar>

</template>
    
<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      player: state => state.player
    })
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    }
  }
};
</script>
    
    <style>
</style>
