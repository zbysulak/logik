<template>
  <v-row @click="$emit('guessClicked', guessColors)">
    <div class="guess my-2">
      <v-sheet
        v-for="c in guessColors"
        v-bind:key="c"
        class="mx-2 rounded-pill guess-item"
        :style="{ backgroundColor: c }"
      ></v-sheet>
    </div>
    <div class="d-flex justify-center align-center">
      <div
        class="result color rounded-circle"
        v-for="c in guess.color"
        v-bind:key="c"
      ></div>
      <div
        class="result position rounded-circle"
        v-for="c in guess.position"
        v-bind:key="c"
      ></div>
      <v-icon v-if="guess.color == 0 && guess.position == 0">mdi-cancel</v-icon>
    </div>
  </v-row>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps(["guess"])
const guessColors = Object.values(props.guess.colors)
</script>

<style scoped>
.guess {
  height: 3em;
}

.guess-item {
  display: inline-block;
  width: 5em;
  height: 3em;
  border: 2px solid #303030;
}

.result {
  width: 1.5em;
  height: 1.5em;
  border: 2px solid #303030;
  display: inline-block;
  margin-right: 0.5em;
}

.color {
  background-color: white;
}

.position {
  background-color: black;
}
</style>
