<template>
    <v-layout row
              class="mb-5">
        <v-flex x12>
            <h1 class="display-4 font-weight-thin text-xs-center">
                <span class="primary--text">{{ title }}</span>
            </h1>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style>
</style>
