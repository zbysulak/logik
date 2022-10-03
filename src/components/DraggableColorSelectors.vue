<template>
  <v-row>
    <transition-group name="swap">
      <div v-for="(c,i) in props.modelValue" :key="c.id"
           :data-idx="i"
           class="colorContainer"
           draggable="true"
           @dragstart="startDrag($event, i)"
           @dragover.prevent
           @dragenter.prevent
           @drop="drop($event, i)"
           @touchstart="startDrag($event, i)"
           @touchmove="move($event)"
           @touchend="drop($event)"
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
import { defineProps, defineEmits} from "vue";

const emit = defineEmits(["update:modelValue"])
const props = defineProps(["modelValue", "usedColors"])

let moving = null
let touchStartEvent = null

function update(code, idx) {
  let newList = props.modelValue
  newList[idx].code = code
}

function startDrag(event, idx) {
  if (event.type === "touchstart") {
    touchStartEvent = event
  } else {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemIdx', idx)
  }
}

function move(event) {
  if (moving == null && touchStartEvent != null &&
      Math.pow(touchStartEvent.changedTouches[0].clientX - event.changedTouches[0].clientX, 2) +
      Math.pow(touchStartEvent.changedTouches[0].clientY - event.changedTouches[0].clientY, 2) > 5
  ) {
    const el = touchStartEvent.target.closest(".colorContainer").cloneNode(true)
    el.style.position = "fixed"
    el.style.height = el.clientHeight;
    el.style.width = el.clientWidth;
    document.body.appendChild(el)
    moving = el
  } else if (moving != null) {
    moving.style.left = event.changedTouches[0].clientX - moving.clientWidth / 2 + "px";
    moving.style.top = event.changedTouches[0].clientY - moving.clientHeight / 2 + "px";
  }
}

function drop(event, droppedAt) {
  if (event.type === "touchend") {
    if (moving == null) return
    const elements = document.querySelectorAll(".colorContainer")
    const touch = event.changedTouches[0]
    for (const e of elements) {
      if (e.dataset.idx === moving.dataset.idx) {
        continue
      }
      const pos = e.getBoundingClientRect()
      if (touch.clientX >= pos.left && touch.clientX <= pos.left + pos.width &&
          touch.clientY >= pos.top && touch.clientY <= pos.top + pos.height) {
        swap(moving.dataset.idx, e.dataset.idx)
        break
      }
    }
    moving.remove()
    moving = null
  } else {
    const itemIdx = event.dataTransfer.getData('itemIdx')
    swap(itemIdx, droppedAt)
  }
}

function swap(idx1, idx2) {
  let newList = props.modelValue
  const tmp = newList[idx1]
  newList[idx1] = newList[idx2]
  newList[idx2] = tmp
  emit("update:modelValue", newList)
}
</script>
<style>
.swap-move {
  transition: all 0.3s ease;
}
</style>