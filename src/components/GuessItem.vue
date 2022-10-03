<template>
  <v-row @click="$emit('guessClicked', guessColors)">
    <div class="guess my-4" translate="yes">
      <v-sheet
        v-for="c in guessColors"
        v-bind:key="c"
        class="mx-2 rounded-pill guess-item animate"
        :color="c"
      ></v-sheet>
    </div>
    <div class="d-flex justify-center align-center">
      <div
        class="result color rounded-circle animate"
        v-for="c in guess.color"
        v-bind:key="c"
      ></div>
      <div
        class="result position rounded-circle animate"
        v-for="c in guess.position"
        v-bind:key="c"
      ></div>
      <v-icon class="animate" v-if="guess.color === 0 && guess.position === 0"
        >mdi-cancel</v-icon
      >
    </div>
  </v-row>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps(["guess"])
const guessColors = Object.values(props.guess.colors)
</script>

<style scoped>
@keyframes splash {
  from {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.guess {
  height: 3em;
}

.animate:nth-child(1) {
  animation-delay: 0ms;
}
.animate:nth-child(2) {
  animation-delay: 100ms;
}
.animate:nth-child(3) {
  animation-delay: 200ms;
}
.animate:nth-child(4) {
  animation-delay: 300ms;
}
.animate:nth-child(5) {
  animation-delay: 400ms;
}
.animate:nth-child(6) {
  animation-delay: 500ms;
}

.animate {
  transform: scale(0);
  animation: splash 400ms normal forwards ease-in-out;
}

.guess-item {
  animation-iteration-count: 1;
  display: inline-block;
  width: 6.4em;
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
