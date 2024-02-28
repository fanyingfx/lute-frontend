<script setup lang="ts" name="WordText">
import type { WordToken } from '@/Interface'
import { firstWordId, lastSelectedWord, mouseKeyDown, wordsSelection, wordState } from '@/store'
import { compareWordIds } from '@/utils/TextUtils'

// const { x, y, sourceType } = useMouse()

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
let props = defineProps<{
  word: WordToken
  wordId: string
}>()

const isSelected = ref<boolean>(false)

const wordStatusClass = computed(() => status_color[`${props.word.wordStatus}`])
watch(wordsSelection, () => {
  console.log('wordsSelection changed')
  isSelected.value =
    compareWordIds(props.wordId, wordsSelection.start_id) >= 0 &&
    compareWordIds(props.wordId, wordsSelection.end_id) <= 0
})

function updateWordState() {
  let currWord = Object.assign({}, props.word)
  currWord.wordStatus = currWord.wordStatus > 0 ? currWord.wordStatus : 1
  wordState.value = currWord
}

// const textRef = ref<HTMLElement | null>(null)

function mouseMove(event: MouseEvent) {
  if (mouseKeyDown.value) {
    if (wordsSelection.start_id == '') {
      wordsSelection.start_id = props.wordId
      wordsSelection.end_id = props.wordId
      lastSelectedWord.value = props.word
    }
    if (
      compareWordIds(props.wordId, wordsSelection.start_id) > 0 ||
      compareWordIds(props.wordId, firstWordId.value) == 0
    ) {
      wordsSelection.end_id = props.wordId
      lastSelectedWord.value = props.word
    } else if (compareWordIds(props.wordId, wordsSelection.start_id) < 0) {
      wordsSelection.start_id = props.wordId
    }
    // updateSelection()
  }
}

function mouseDown(event: MouseEvent) {
  // save first wordId to detect mousemove direction
  if (!mouseKeyDown.value) {
    firstWordId.value = props.wordId
  }

  mouseKeyDown.value = true
}
</script>

<template>
  <!--  TODO remove data-attribute using -->
  <n-text
    class="word_text"
    :class="[wordStatusClass, { 'bg-yellow-400': isSelected }]"
    :id="wordId"
    :data-is-word="word.isWord"
    :data-word-tokens="word.wordTokens"
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
