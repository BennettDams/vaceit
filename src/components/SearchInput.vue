<template>
  <v-form v-model="valid">
    <v-layout row
              align-center>

      <v-flex sm11>

        <v-text-field v-model="searchInput"
                      :rules="searchInputRules"
                      label="   "
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
      ],
      t:
        "Nicknames can be made of letters (a-z, A-Z), numbers (0-9), spaces, '_' and '-' only."
    };
  }
};
</script>

<style>
</style>
