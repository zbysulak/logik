<template>
  <v-btn
      @click="emit('clicked')"
      class="mx-2"
      :icon="$vuetify.display.mobile"
  >
    <v-icon v-if="$vuetify.display.mobile">{{ mobileIcon }}</v-icon>
    <slot v-else>
      <template>Button</template>
    </slot>
  </v-btn>
</template>
<script setup>
import {defineProps, defineEmits} from "vue"

defineProps(["mobileIcon"])
const emit = defineEmits(["clicked"])

</script>