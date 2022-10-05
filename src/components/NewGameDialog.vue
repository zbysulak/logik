<template>
  <v-dialog v-model="dialog" :persistent="first" :fullscreen="$vuetify.display.mobile" :class="$vuetify.display.mobile?'ma-5':''">
    <template v-slot:activator="{ props }">
      <mobile-icon-button v-bind="props" class="ml-2" mobile-icon="mdi-restart"> Start new game</mobile-icon-button>
    </template>

    <v-card :class="$vuetify.display.mobile?'rounded':''">
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
        <v-btn v-if="!first" color="secondary" @click="dialog = false">Close</v-btn>
        <v-btn color="primary" @click="start">Start game</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, defineEmits} from "vue"
import MobileIconButton from "@/components/MobileIconButton";

const emit = defineEmits(["start"])
const dialog = ref(true)
const slots = ref(4)
const colors = ref(6)
const allowMultiple = ref(false)
const first = ref(true)

function start() {
  let settings = {
    slots: slots.value,
    colors: colors.value,
    allowMultiple: allowMultiple.value
  }
  dialog.value = false
  first.value = false
  emit("start", settings)
}
</script>
