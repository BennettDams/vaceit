<template>
    <!-- <v-navigation-drawer v-model="drawer" -->
    <v-navigation-drawer :value="drawer"
                         clipped
                         fixed
                         app>
        <v-list dense>
            <v-list-tile to="/">
                <v-list-tile-action>
                    <v-icon>search</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>SEARCH</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/about">
                <v-list-tile-action>
                    <v-icon>person</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>ABOUT</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
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
    // ...mapGetters("cart", {
    //   products: "cartProducts",
    //   total: "cartTotalPrice"
    // })
  }
};
</script>

<style>
</style>
