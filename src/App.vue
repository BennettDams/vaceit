<template>
  <v-app id="VACEIT"
         dark>

    <Sidebar></Sidebar>

    <Toolbar></Toolbar>

    <v-content>
      <v-container fluid
                   fill-height>
        <v-layout justify-center
                  align-center>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator"
                     :href="source"
                     icon
                     large
                     target="_blank">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn slot="activator"
                     icon
                     large
                     href="https://codepen.io/johnjleider/pen/qxQWda"
                     target="_blank">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <PageFooter></PageFooter>

  </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Sidebar from "@/components/Sidebar";
import PageFooter from "@/components/PageFooter";

export default {
  name: "App",
  components: {
    Toolbar,
    Sidebar,
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
