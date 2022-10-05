<template>
  <v-app>
    <v-main>
      <v-container class="game-wrapper d-flex flex-column rounded-lg">
        <div class="flex-grow-1">
          <guess-item
              v-for="g in guesses"
              :guess="g"
              v-bind:key="g"
              @guessClicked="updateColors"
          />
        </div>
        <v-row class="mt-2 flex-grow-0">
          <v-container>
            <draggable-color-selectors
                v-model="colorsToCheck"
                :used-colors="logik.usedColors"/>
            <v-row class="mt-6">
              <shaking-button :enabled="canCheck" @clicked="check" mobile-icon="mdi-check"
              >Check
              </shaking-button>
              <shaking-button
                  :enabled="logik.usedColors !== undefined"
                  @clicked="randomize"
                  mobile-icon="mdi-shuffle"
              >Randomize
              </shaking-button>
              <mobile-icon-button
                  @click="clear"
                  mobile-icon="mdi-delete-outline"
              >Clear
              </mobile-icon-button>
              <v-spacer/>
              <new-game-dialog @start="startGame"/>
              <game-result-dialog
                  :dialog="showResult"
                  :success="resultSuccess"
                  @hide="showResult = false"
                  @restart="restartGame"
              />
              <help-dialog/>
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
import NewGameDialog from "@/components/NewGameDialog.vue"
import HelpDialog from "@/components/HelpDialog.vue"
import GameResultDialog from "@/components/GameResultDialog.vue"
import ShakingButton from "@/components/ShakingButton.vue"
import {ref, computed} from "vue"
import DraggableColorSelectors from "@/components/DraggableColorSelectors";
import MobileIconButton from "@/components/MobileIconButton";

const logik = new Logik()

const maxGuesses = 10

const guesses = ref([])
const showResult = ref(false)
const resultSuccess = ref(false)
const colorsToCheck = ref(null)
const currentSettings = ref(null)

const canCheck = computed(() => {
  const colors = getSelectedColors()
  return (
      colors !== undefined &&
      colors.length > 0 &&
      !colors.some((c) => c === undefined) &&
      guesses.value.length < maxGuesses
  )
})

function getSelectedColors() {
  if (colorsToCheck.value == null) return undefined
  return Object.values(colorsToCheck.value).map((co) => co.code)
}

function updateColors(colors = []) {
  if (colorsToCheck.value == null || colorsToCheck.value.length !== colors.length) {
    let newArray = []
    for (let i = 0; i < logik.slots; i++) {
      newArray.push({code: colors ? colors[i] : undefined, id: i})
    }
    colorsToCheck.value = newArray
  } else {
    for (let i = 0; i < logik.slots; i++) {
      colorsToCheck.value[i].code = colors ? colors[i] : undefined
    }
  }
}

function check() {
  const colors = getSelectedColors()
  let answer = logik.check(colors)
  guesses.value.push(answer)
  if (answer.position === logik.slots) {
    showResult.value = true
    resultSuccess.value = true
  } else if (
      guesses.value.length >= maxGuesses &&
      answer.position !== logik.slots
  ) {
    showResult.value = true
    resultSuccess.value = false
  }
}

function clear() {
  updateColors()
}

function randomize() {
  updateColors(logik.getRandomSet())
}

function restartGame() {
  startGame(currentSettings.value)
}

function startGame(settings) {
  currentSettings.value = settings
  guesses.value = []
  logik.startGame(settings)
  updateColors()
}
</script>
<style scoped>
.game-wrapper {
  border: 2px solid #303030;
  min-height: 60%;
  max-width: 950px;
  margin-top: 100px;
}

@media screen and (max-width: 600px) {
  .game-wrapper {
    min-height: 100%;
    margin-top: 0;
    border: 0;
  }
}
</style>
