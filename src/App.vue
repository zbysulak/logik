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
          <v-btn
            @click="check"
            id="btnCheck"
            class="mx-2"
            :class="{ 'apply-shake': shaking }"
            >Check</v-btn
          >
          <v-btn @click="clear" class="mx-2">Clear</v-btn>
          <new-game-dialog @start="restartGame" />
          <game-result-dialog
            :dialog="showResult"
            :success="resultSuccess"
            @hide="showResult = false"
          />
          <help-dialog />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Logik from "@/plugins/logic"
import GuessItem from "@/components/GuessItem.vue"
import ColorSelector from "@/components/ColorSelector.vue"
import NewGameDialog from "@/components/NewGameDialog.vue"
import HelpDialog from "@/components/HelpDialog.vue"
import GameResultDialog from "@/components/GameResultDialog.vue"
import draggable from "vuedraggable"
import { ref, onMounted } from "vue"

var logik = new Logik()

const maxGuesses = 10

const drag = ref(false)
const guesses = ref([])
const shaking = ref(false)
const showResult = ref(false)
const resultSuccess = ref(false)
const colorsToCheck = ref(getArray())

function update(code, idx) {
  colorsToCheck.value[idx].code = code
}

function getArray(colors) {
  let array = []
  for (let i = 0; i < logik.slots; i++) {
    array.push({ code: colors ? colors[i] : undefined, order: i })
  }
  return array
}

function check() {
  const colors = Object.values(colorsToCheck.value).map((co) => co.code)
  if (
    colors.some((c) => c == undefined) ||
    guesses.value.length >= maxGuesses
  ) {
    shaking.value = true
    return
  }
  let answer = logik.check(colors)
  guesses.value.push(answer)
  if (answer.position == logik.slots) {
    console.log("vyhrals")
    showResult.value = true
    resultSuccess.value = true
  } else if (
    guesses.value.length >= maxGuesses &&
    answer.position != logik.slots
  ) {
    console.log("prohrals")
    showResult.value = true
    resultSuccess.value = false
  }
}

function clear() {
  colorsToCheck.value = getArray()
}

function setColors(colors) {
  colorsToCheck.value = getArray(colors)
}

function restartGame(settings) {
  console.log("starting game with ", settings)
  guesses.value = []
  logik.startGame(settings)
  colorsToCheck.value = getArray()

  console.log("ng", logik.usedColors)
}

onMounted(() => {
  // could it be done using ref?
  document.querySelector("#btnCheck").addEventListener("animationend", () => {
    shaking.value = false
  })
})
</script>
<style scoped>
.selector-container {
  display: inline-block;
}

/* Standard syntax */
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>
