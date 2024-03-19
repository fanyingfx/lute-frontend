<script setup lang="ts">
import type { WordToken } from '@/api/Interface'
import {
  compareWordIds,
  firstWordId,
  mouseKeyDown,
  wordIdInRange,
  wordList,
  wordsSelection,
  selectedWord
} from '@/store/WordsSelectionStore'

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

function onWordClick() {
  const currWord = { ...props.word }
  console.log('wordClicked', currWord)
  currWord.wordStatus = currWord.wordStatus > 0 ? currWord.wordStatus : 1
  wordClicked.value = true
  firstWordId.value = props.wordId
  wordsSelection.start_id = props.wordId
  wordsSelection.end_id = props.wordId
  wordsSelection.last_id = props.wordId
  // when click set current word to selected
  selectedWord.value = currWord
}
// using to record the first word
const wordClicked = ref(false)
function mouseDown() {
  // save first wordId to detect mousemove direction
  if (!mouseKeyDown.value) {
    onWordClick()
    // resetWordsSelection()
  }
  mouseKeyDown.value = true
}

function mouseMove() {
  if (!mouseKeyDown.value) {
    return
  }
  if (wordClicked.value) {
    // when mouseMove reset current wordClicked to false
    wordClicked.value = false
    console.log('wordClicked', wordClicked.value)
    return
  }
  console.log('current word', props.wordId, props.word.wordString)
  if (
    compareWordIds(props.wordId, wordsSelection.start_id) > 0 ||
    compareWordIds(props.wordId, firstWordId.value) == 0
  ) {
    console.log('current selection', wordsSelection)
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
    console.log(wordList)
  }
}
</script>

<template>
  <span
    class="word_text"
    :class="[wordStatusClass, { 'bg-yellow-400': isSelected }]"
    :id="wordId"
    @mousemove="mouseMove"
    @mousedown="mouseDown"
  >
    <ruby
      >{{ word.wordString
      }}<rt v-if="word.wordPronunciation != ''">{{ word.wordPronunciation }}</rt></ruby
    >{{ word.nextIsWs ? '&nbsp;' : '' }}
  </span>
</template>

<style lang="postcss" scoped>
span {
  user-select: none;
}

.word_text {
  @apply whitespace-normal inline-block text-lg;
}
</style>
