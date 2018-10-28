<template>
  <div id="app">
    <v-app id="vuetify-app"
           dark>

      <!-- <Sidebar></Sidebar> -->

      <Navbar></Navbar>

      <v-content>
        <v-container>
          <transition name="slide">
            <router-view></router-view>
          </transition>
        </v-container>
      </v-content>

      <PageFooter></PageFooter>

    </v-app>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
import PageFooter from "@/components/PageFooter";

export default {
  name: "App",
  components: {
    Navbar,
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
