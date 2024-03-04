<script setup lang="ts">
import type { WordToken } from '@/Interface'
import { firstWordId, mouseKeyDown, wordList, wordsSelection, wordState } from '@/store'
import { compareWordIds, wordIdInRange } from '@/utils/TextUtils'

let props = defineProps<{
  word: WordToken
  wordId: string
}>()
// https://tailwindcss.com/docs/text-color
const status_color: { [key: string]: string } = {
  '0': 'text-sky-600',
  '1': 'text-yellow-600',
  '2': 'text-lime-600',
  '3': 'text-violet-600',
  '4': 'text-orange-600',
  '5': 'text-red-600',
  '99': 'text-black',
  '-1': 'text-black'
}
const wordStatusClass = computed(() => status_color[`${props.word.wordStatus}`])
// TODO test word select function, maybe need e2e test
const isSelected = computed(() =>
  wordIdInRange(props.wordId, wordsSelection.start_id, wordsSelection.end_id)
)

function updateWordState() {
  const currWord = { ...props.word }
  currWord.wordStatus = currWord.wordStatus > 0 ? currWord.wordStatus : 1
  wordState.value = currWord
}

function mouseDown() {
  // save first wordId to detect mousemove direction
  if (!mouseKeyDown.value) {
    firstWordId.value = props.wordId
  }
  mouseKeyDown.value = true
}

function mouseMove() {
  if (!mouseKeyDown.value) {
    return
  }
  if (wordsSelection.start_id == '') {
    wordsSelection.start_id = props.wordId
    wordsSelection.end_id = props.wordId
    wordsSelection.last_id = props.wordId
    return
  }
  if (
    compareWordIds(props.wordId, wordsSelection.start_id) > 0 ||
    compareWordIds(props.wordId, firstWordId.value) == 0
  ) {
    wordsSelection.end_id = props.wordId
    wordsSelection.last_id = props.wordId
  } else if (compareWordIds(props.wordId, wordsSelection.start_id) < 0) {
    wordsSelection.start_id = props.wordId
  }
  if (
    wordIdInRange(props.wordId, wordsSelection.start_id, wordsSelection.end_id) &&
    !wordList.value.map((w) => w.word_id).includes(props.wordId)
  ) {
    wordList.value.push({ word_id: props.wordId, word: props.word })
  }
}
</script>

<template>
  <n-text
    class="word_text"
    :class="[wordStatusClass, { 'bg-yellow-400': isSelected }]"
    :id="wordId"
    @click="updateWordState"
    @mousemove="mouseMove"
    @mousedown="mouseDown"
  >
    {{ word.wordString }}{{ word.nextIsWs ? '&nbsp;' : '' }}
  </n-text>
</template>

<style lang="postcss" scoped>
span {
  user-select: none;
}

.word_text {
  @apply whitespace-normal inline-block;
}
</style>
