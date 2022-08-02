<template>
  <v-app>
    <v-main>
      <v-container>
        <guess-item
          v-for="g in guesses"
          :guess="g"
          v-bind:key="g"
          @guessClicked="setColors"
        />
        <v-row class="mt-2">
          <draggable
            v-model="colorsToCheck"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
            item-key="order"
          >
            <template #item="{ el, index }">
              <div class="selector-container">
                <color-selector
                  v-bind:modelValue="colorsToCheck[index].code"
                  v-on:update:modelValue="update($event, index)"
                  :colors="logik.usedColors"
                />
              </div>
            </template>
          </draggable>
          <v-btn @click="check" class="mx-2">Check</v-btn>
          <v-btn @click="clear" class="mx-2">Clear</v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Logik from "@/plugins/logic"
import GuessItem from "@/components/GuessItem.vue"
import ColorSelector from "@/components/ColorSelector.vue"
import draggable from "vuedraggable"
import { ref, onMounted, reactive } from "vue"

const drag = ref(false)
var logik = new Logik({ colors: 3, slots: 2 })
const guesses = ref([])

function dragOptions() {
  return {
    ghostClass: "ghost"
  }
}

function update(code, idx) {
  colorsToCheck.value[idx].code = code
}

console.log(logik.usedColors)
// reactive state
function getArray(colors) {
  let array = []
  for (let i = 0; i < logik.slots; i++) {
    array.push({ code: colors ? colors[i] : undefined, order: i })
  }
  console.log(colors, array)
  return array
}

const colorsToCheck = ref(getArray())

function check() {
  const c = Object.values(colorsToCheck.value).map((co) => co.code)
  console.log(colorsToCheck.value, c)
  var a = logik.check(c)
  console.log(a)
  guesses.value.push(a)
}

function clear() {
  colorsToCheck.value = getArray()
}

function setColors(colors) {
  colorsToCheck.value = getArray(colors)
  console.log(colorsToCheck)
}
</script>
<style scoped>
.selector-container {
  display: inline-block;
}
.selector-container .mdi {
  cursor: ew-resize;
}
</style>
