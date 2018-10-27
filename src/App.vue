<template>
  <div id="app">
    <v-app id="vuetify-app"
           dark>

      <!-- <Sidebar></Sidebar> -->

      <Toolbar></Toolbar>

      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>

      <PageFooter></PageFooter>

    </v-app>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
// import Sidebar from "@/components/Sidebar";
import PageFooter from "@/components/PageFooter";

export default {
  name: "App",
  components: {
    Toolbar,
    // Sidebar,
    PageFooter
  },
  props: {
    source: String
  },
  data() {
    return {
      drawer: null
    };
  }
};
</script>

<style lang="scss" src="@/styles/App.scss">
</style>
