<template>
  <v-toolbar app
             fixed>

    <!-- <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon> -->

    <v-toolbar-title>
      <h1 class="display-2 font-weight-thin">VACEIT</h1>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-text-field flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="search"
                  label="SEARCH FOR PLAYERS"
                  class="hidden-sm-and-down">
    </v-text-field> -->

    <v-toolbar-items>
      <v-btn to="/"
             flat>
        <v-icon>home</v-icon>
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
import store from "@/store";
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  methods: {
    toggleDrawer() {
      store.dispatch("toggleDrawer");
    }
  }
};
</script>
    
    <style>
</style>
