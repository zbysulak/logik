<template>
  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <v-btn
        class="pl-16 mx-2"
        :color="modelValue"
        v-bind="props"
        append-icon="mdi-chevron-down"
      >
      </v-btn>
    </template>
    <v-list class="pa-0">
      <v-list-item
        :style="{ backgroundColor: c }"
        class="ma-1 rounded"
        v-for="c in colors"
        :value="c"
        v-bind:key="c"
        @click="$emit('update:modelValue', c)"
      >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
defineEmits(["update:modelValue"])
const props = defineProps(["colors", "modelValue"])
</script>
