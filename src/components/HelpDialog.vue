<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="ml-2" icon
        ><v-icon>mdi-help-circle-outline</v-icon></v-btn
      >
    </template>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6"> Help</v-card-title>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab value="rules"> Rules </v-tab>
        <v-tab value="controls"> Controls </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="rules">
          <v-card color="basil" flat>
            <v-card-text>
              You have to guess colors and theirs order correctly. You have
              total of 10 guesses. After each guess you will get result of
              combination of black and white dots. White dot means one of your
              colors is correct. Black dot means one of your colors is correct
              AND also its position. Order of black and white dots does not mean
              anything.
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="controls">
          <v-card color="basil" flat>
            <v-card-text>
              <p>
                To start a game you have to select few options first. 'Number of
                slots' is number of colors you have to guess. 'Number of colors'
                is total number of colors from which 'dealer' select your
                target. 'Allow multiple colors' means 'dealer' can select same
                color in multiple slots, which also increases difficulty.
              </p>
              <p>
                After game starts you can start guessing by selecting your
                colors and pressing 'Check' button. 'Clear' buttons resets you
                selection. You can 'go back' to your previous selection by
                clicking on the guess. It is possible to swap colors by
                drag&droping them.
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue"
const dialog = ref(false)
const tab = ref(null)
const items = ref(["Appetizers", "Entrees", "Deserts", "Cocktails"])
</script>

<style lang="scss" scoped></style>
