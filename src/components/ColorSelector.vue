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
          v-for="c in colors"
          :key="c"
          class="ma-1 rounded"
          :class="c"
          :value="c"
          @click="$emit('update:modelValue', c)"
      >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import {defineProps, defineEmits} from "vue"

defineEmits(["update:modelValue"])
defineProps(["colors", "modelValue"])
</script>

<style scoped>
.red {
  background-color: #F44336;
}
.green {
  background-color: #4CAF50;
}
.blue {
  background-color: #2196F3;
}
.yellow {
  background-color: #FFEB3B;
}
.orange {
  background-color: #FF9800;
}
.white {
  background-color: #fff;
}
.black {
  background-color: #000;
}
.pink {
  background-color: #E91E63;
}
.brown {
  background-color: #795548;
}
.purple {
  background-color: #9C27B0;
}
.cyan {
  background-color: #00BCD4;
}

</style>
