<template>
  <v-app>
    <v-main>
      <v-container class="game-wrapper d-flex flex-column rounded-lg">
        <div class="flex-grow-1">
          <guess-item
            v-for="g in guesses"
            :guess="g"
            v-bind:key="g"
            @guessClicked="setColors"
          />
        </div>
        <v-row class="mt-2 flex-grow-0">
          <v-container>
            <v-row>
              <draggable
                v-model="colorsToCheck"
                @start="drag = true"
                @end="drag = false"
                item-key="order"
              >
                <template #item="{ item, index }">
                  <div class="selector-container">
                    <color-selector
                      v-bind:modelValue="colorsToCheck[index].code"
                      v-on:update:modelValue="update($event, index)"
                      :colors="logik.usedColors"
                    />
                  </div>
                </template>
              </draggable>
            </v-row>
            <v-row class="mt-6">
              <shaking-button :enabled="canCheck" @clicked="check"
                >Check</shaking-button
              >
              <shaking-button
                :enabled="logik.usedColors != undefined"
                @clicked="randomize"
                >Randomize</shaking-button
              >
              <v-btn @click="clear" class="mx-2">Clear</v-btn>
              <v-spacer />
              <new-game-dialog @start="startGame" />
              <game-result-dialog
                :dialog="showResult"
                :success="resultSuccess"
                @hide="showResult = false"
                @restart="restartGame"
              />
              <help-dialog />
            </v-row>
          </v-container>
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
import ShakingButton from "@/components/ShakingButton.vue"
import draggable from "vuedraggable"
import { ref, computed } from "vue"

var logik = new Logik()

const maxGuesses = 10

const drag = ref(false)
const guesses = ref([])
const showResult = ref(false)
const resultSuccess = ref(false)
const colorsToCheck = ref(getArray())
const currentSettings = ref(null)

const canCheck = computed(() => {
  const colors = getSelectedColors()
  return (
    colors != undefined &&
    colors.length > 0 &&
    !colors.some((c) => c == undefined) &&
    guesses.value.length < maxGuesses
  )
})

function update(code, idx) {
  colorsToCheck.value[idx].code = code
}

function getSelectedColors() {
  return Object.values(colorsToCheck.value).map((co) => co.code)
}

function getArray(colors) {
  let array = []
  for (let i = 0; i < logik.slots; i++) {
    array.push({ code: colors ? colors[i] : undefined, order: i })
  }
  return array
}

function check() {
  const colors = getSelectedColors()
  let answer = logik.check(colors)
  guesses.value.push(answer)
  if (answer.position == logik.slots) {
    showResult.value = true
    resultSuccess.value = true
  } else if (
    guesses.value.length >= maxGuesses &&
    answer.position != logik.slots
  ) {
    showResult.value = true
    resultSuccess.value = false
  }
}

function clear() {
  colorsToCheck.value = getArray()
}

function randomize() {
  colorsToCheck.value = getArray(logik.getRandomSet())
}

function setColors(colors) {
  colorsToCheck.value = getArray(colors)
}

function restartGame() {
  startGame(currentSettings.value)
}

function startGame(settings) {
  currentSettings.value = settings
  guesses.value = []
  logik.startGame(settings)
  colorsToCheck.value = getArray()
}
</script>
<style scoped>
.game-wrapper {
  border: 2px solid #303030;
  min-height: 60%;
  max-width: 950px;
  margin-top: 100px;
}

.selector-container {
  display: inline-block;
}
</style>
