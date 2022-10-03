<template>
  <v-row>
    <transition-group name="swap">
      <div v-for="(c,i) in props.modelValue" :key="c"
           draggable="true"
           @dragstart="startDrag($event, i)"
           @dragover.prevent
           @dragenter.prevent
           @drop="drop($event, i)"
      >
        <color-selector
            v-bind:modelValue="c.code"
            v-on:update:modelValue="update($event, i)"
            :colors="props.usedColors"
        />
      </div>
    </transition-group>
  </v-row>
</template>
<script setup>
import ColorSelector from "@/components/ColorSelector.vue"
import {defineProps, defineEmits} from "vue";

const emit = defineEmits(["update:modelValue"])
const props = defineProps(["modelValue", "usedColors"])

function update(code, idx) {
  let newList = props.modelValue
  newList[idx].code = code

  console.log("update - newlist", newList)
}

function startDrag(event, idx) {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemIdx', idx)
}

function drop(event, droppedAt) {
  let newList = props.modelValue
  const itemIdx = event.dataTransfer.getData('itemIdx')
  const tmp = newList[itemIdx]
  newList[itemIdx] = newList[droppedAt]
  newList[droppedAt] = tmp
  emit("update:modelValue", newList)
}
</script>
<style>
.swap-move {
  transition: all 0.3s ease;
}
</style>