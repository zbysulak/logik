<template>
  <v-container>
    <guess-item
      v-for="g in guesses"
      :guess="g"
      v-bind:key="g"
      @guessClicked="setColors"
    />
    <v-row class="mt-2">
      <!-- v-for IN directive is 1-BASED! -->
      <color-selector
        v-for="(_, slot) in logik.slots"
        v-bind:key="slot"
        v-model="colorsToCheck[slot]"
        :colors="logik.usedColors"
      />
      <v-btn @click="check">Check</v-btn>
      <v-btn @click="clear" icon><v-icon>mdi-close</v-icon></v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import Logik from "../plugins/logic"
import GuessItem from "./GuessItem.vue"
import ColorSelector from "./ColorSelector.vue"
import { ref, onMounted, reactive } from "vue"

var logik = new Logik({ colors: 6, slots: 4 })
const guesses = ref([])
const t = ref("blue")

console.log(logik.usedColors)
// reactive state
const colorsToCheck = ref([])

function check() {
  var a = logik.check(Object.values(colorsToCheck.value))
  guesses.value.push(a)
}

function clear() {
  colorsToCheck.value = []
}

function setColors(colors) {
  colorsToCheck.value = colors
}
</script>
