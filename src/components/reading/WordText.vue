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
  word_id: string
}>()

const isSelected = ref<boolean>(false)

const word_status_class = computed(() => status_color[`${props.word.word_status}`])
watch(wordsSelection, () => {
  console.log('wordsSelection changed')
  isSelected.value =
    compareWordIds(props.word_id, wordsSelection.start_id) >= 0 &&
    compareWordIds(props.word_id, wordsSelection.end_id) <= 0
})

function updateWordState() {
  wordState.value = props.word
}

// const textRef = ref<HTMLElement | null>(null)

function mouseMove(event: MouseEvent) {
  if (mouseKeyDown.value) {
    if (wordsSelection.start_id == '') {
      wordsSelection.start_id = props.word_id
      wordsSelection.end_id = props.word_id
      lastSelectedWord.value = props.word
    }
    if (
      compareWordIds(props.word_id, wordsSelection.start_id) > 0 ||
      compareWordIds(props.word_id, firstWordId.value) == 0
    ) {
      wordsSelection.end_id = props.word_id
      lastSelectedWord.value = props.word
    } else if (compareWordIds(props.word_id, wordsSelection.start_id) < 0) {
      wordsSelection.start_id = props.word_id
    }
    // updateSelection()
  }
}

function mouseDown(event: MouseEvent) {
  // save first wordId to detect mousemove direction
  if (!mouseKeyDown.value) {
    firstWordId.value = props.word_id
  }

  mouseKeyDown.value = true
}
</script>

<template>
  <!--  TODO remove data-attribute using -->
  <n-text
    class="word_text"
    :class="[word_status_class, { 'bg-yellow-400': isSelected }]"
    :id="word_id"
    :data-is-word="word.is_word"
    :data-word-tokens="word.word_tokens"
    @click="updateWordState"
    @mousemove="mouseMove"
    @mousedown="mouseDown"
  >
    {{ word.word_string }}{{ word.next_is_ws ? '&nbsp;' : '' }}
  </n-text>
</template>

<style lang="postcss" scoped>
span {
  user-select: none;
}

.word_text {
  @apply whitespace-normal inline-block border border-x-emerald-400;
}
</style>
