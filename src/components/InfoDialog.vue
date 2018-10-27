<template>
    <v-dialog v-model="dialogInfo"
              width="500">
        <v-icon slot="activator"
                color="secondary">
            info
        </v-icon>

        <v-card>
            <v-card-title class="headline justify-center font-weight-thin"
                          primary-title>
                Come on, it's not that hard ¯\_(ツ)_/¯
            </v-card-title>

            <v-divider class="mb-1"></v-divider>

            <v-card-text class="text-xs-center">
                <p>You see a FACEIT profile you want to check out, for example flusha's</p>
                <h4 class="mb-2 primary--text font-italic">flusha</h4>
                <h4 class="mb-2 font-italic">OR</h4>
                <h4 class="mb-2 primary--text font-italic">https://www.faceit.com/en/players/flusha</h4>

            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>
