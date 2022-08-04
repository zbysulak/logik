<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="ml-2"> Start new game </v-btn>
    </template>

    <v-card width="600px">
      <v-card-text>
        Number of slots: {{ slots }}
        <v-slider v-model="slots" step="1" min="2" max="6"></v-slider>
        Number of colors: {{ colors }}
        <v-slider v-model="colors" step="1" min="2" max="11"></v-slider>
        <v-switch
          color="primary"
          v-model="allowMultiple"
          label="Allow multiple colors"
        ></v-switch>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="dialog = false">Close</v-btn>
        <v-btn color="primary" @click="start">Start game</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits } from "vue"
const emit = defineEmits(["start"])
const dialog = ref(true)
const slots = ref(2)
const colors = ref(3)
const allowMultiple = ref(false)

function start() {
  let settings = {
    slots: slots.value,
    colors: colors.value,
    allowMultiple: allowMultiple.value
  }
  console.log(settings)
  dialog.value = false
  emit("start", settings)
}
</script>

<style lang="scss" scoped></style>
