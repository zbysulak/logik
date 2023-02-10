<template>
  <v-dialog v-bind:modelValue="dialog" :fullscreen="$vuetify.display.mobile" :class="$vuetify.display.mobile?'ma-5':''">
    <v-card width="600px">
      <v-card-title>
        {{ success ? "You won!" : "You lost" }}
      </v-card-title>
      <v-card-text v-if="success">Congratulations</v-card-text>
      <v-card-text v-else>Too bad.</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('hide')">Close</v-btn>
        <v-btn color="secondary" @click="restart">Restart game</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineEmits, defineProps } from "vue"
const emit = defineEmits(["restart", "hide"])
defineProps(["dialog", "success"])

function restart() {
  emit("hide")
  emit("restart")
}
</script>

<style lang="scss" scoped></style>
