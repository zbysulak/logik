<template>
  <v-container>
    <guess-item
      v-for="g in guesses"
      :guess="g"
      v-bind:key="g"
      @guessClicked="setColors"
    />
    <v-row class="mt-2">
      <v-select
        class="mx-2"
        v-for="slot in logik.slots"
        v-bind:key="slot"
        :items="logik.usedColors"
        item-title="name"
        item-value="code"
        v-model="colorsToCheck[slot]"
        :class="slot"
      />
      <v-btn @click="check">Check</v-btn>
      <v-btn @click="clear" icon><v-icon>mdi-close</v-icon></v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import Logik from "../plugins/logic"
import GuessItem from "./GuessItem.vue"
import { ref, onMounted, reactive } from "vue"

var logik = new Logik({ colors: 6, slots: 4 })
const guesses = ref([])

console.log(logik.usedColors)
// reactive state
const colorsToCheck = ref([])

function check() {
  console.log(Object.values(colorsToCheck.value))
  var a = logik.check(Object.values(colorsToCheck.value))
  guesses.value.push(a)
}

function clear() {
  colorsToCheck.value = []
}

function setColors(colors) {
  console.log(colors)
  colorsToCheck.value = colors
  console.log(colorsToCheck.value)
}

// lifecycle hooks
onMounted(() => {
  console.log("mounted")
})
</script>
