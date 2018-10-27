<template>
    <v-dialog width="500">
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
                <p>Enter the FACEIT username or account URL you want to check out, for example flusha's</p>
                <h4 class="mb-2 primary--text font-italic">flusha</h4>
                <h4 class="mb-2 font-italic">OR</h4>
                <h4 class="mb-2 primary--text font-italic">https://www.faceit.com/en/players/flusha</h4>
                <small>Just a reminder: Nicknames can be made of letters (a-z, A-Z),<br> numbers (0-9), spaces, '_' and '-' only.</small>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>
