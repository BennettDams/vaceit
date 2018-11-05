<template>
  <v-toolbar app
             fixed>

    <!-- <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon> -->

    <v-toolbar-title>
      <h1 class="display-2 font-weight-thin text-xs-center">
        <span class="primary--text">VAC</span>
        <span>EIT</span>
      </h1>

    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>

      <v-btn v-if="user.avatar">
        <v-avatar justify-center
                  :title="user.nickname"
                  size="40px">
          <img :src="user.avatar"
               alt="avatar">
        </v-avatar>
      </v-btn>

      <v-btn flat>{{ user.nickname }}</v-btn>
      <v-btn to="/"
             flat>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn to="/bans-and-enemies"
             flat>BANS &amp; ENEMIES</v-btn>
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
      user: state => state.user
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
