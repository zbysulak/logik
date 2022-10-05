<template>
  <v-dialog v-model="dialog" :fullscreen="$vuetify.display.mobile" :class="$vuetify.display.mobile?'ma-5':''">
    <template v-slot:activator="{ props }">
      <mobile-icon-button v-bind="props" class="ml-2" mobile-icon="mdi-help">Help</mobile-icon-button>
    </template>
    <v-card color="basil" :class="$vuetify.display.mobile?'rounded':''">
      <v-card-title class="text-center justify-center py-6"> Help</v-card-title>
      <v-tabs v-model="tab" background-color="transparent">
        <v-tab value="rules"> Rules</v-tab>
        <v-tab value="controls"> Controls</v-tab>
      </v-tabs>

      <v-window v-model="tab" class="flex-grow-1">
        <v-window-item value="rules">
          <v-card color="basil" flat>
            <v-card-text>
              <p>
                You have to guess colors and theirs order correctly. You have
                total of 10 guesses.
              </p>
              <p>
                After each guess you will get result of combination of black and
                white dots.
              </p>
              <ul class="ml-2">
                <li>White dot means one of your colors is correct.</li>
                <li>
                  Black dot means one of your colors is correct AND also its
                  position.
                </li>
                <li>Order of black and white dots does not mean anything.</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="controls">
          <v-card color="basil" flat>
            <v-card-text>
              <p>To start a game you have to select few options first.</p>
              <ul class="ml-2">
                <li>
                  'Number of slots' is number of colors you have to guess.
                </li>
                <li>
                  'Number of colors' is total number of colors from which
                  'dealer' select your target.
                </li>
                <li>
                  'Allow multiple colors' means 'dealer' can select same color
                  in two slots, which also increases difficulty.
                </li>
              </ul>
              <p>After game starts you can start guessing by selecting your
                colors and pressing 'Check' button.
              </p>
              <p>'Clear' buttons resets you selection.</p>
              <p>You can 'go back' to your previous selection by clicking on the
                guess.
              </p>
              <p>It is possible to swap colors by drag&droping them.</p>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
      <v-card-actions
      >
        <v-btn block @click="dialog = false">close</v-btn>
      </v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue"
import MobileIconButton from "@/components/MobileIconButton";

const dialog = ref(false)
const tab = ref(null)
</script>

<style scoped>
p {
  margin-bottom: 1em;
}

li {
  margin-bottom: .7em;
}

ul {
  list-style-type: none;
}
</style>
