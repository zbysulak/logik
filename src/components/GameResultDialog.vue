<template>
  <v-dialog v-bind:modelValue="dialog">
    <v-card width="600px">
      <v-card-title>
        {{ success ? "You won!" : "You lost" }}
      </v-card-title>
      <v-card-text v-if="success">Congratulations</v-card-text>
      <v-card-text v-else>Too bad.</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('hide')">Close Dialog</v-btn>
        <v-btn color="secondary" @click="$emit('hide')">Restart game</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue"
const emit = defineEmits(["restart", "hide"])
const props = defineProps(["dialog", "success"])
</script>

<style lang="scss" scoped></style>
