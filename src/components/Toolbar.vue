<template>
    <v-toolbar app
               fixed
               clipped-left>
        <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
        <v-toolbar-title>VACEIT</v-toolbar-title>
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
