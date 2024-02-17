<script setup lang="ts" name="WordText">
import type { WordToken } from '@/Interface'
import { firstWordId, mouseKeyDown, wordsSelection, wordState } from '@/store'
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

const word_status_class = computed(() => [
  'whitespace-normal',
  'inline-block',
  '.word_text',
  'border',
  'border-x-emerald-400',
  status_color[`${props.word.word_status}`]
])

function updateWordState() {
  wordState.value = props.word
}

// const textRef = ref<HTMLElement | null>(null)

function mouseMove(event: MouseEvent) {
  if (mouseKeyDown.value) {
    if (wordsSelection.start_id == '') {
      wordsSelection.start_id = props.word_id
      wordsSelection.end_id = props.word_id
    }
    if (
      compareWordIds(props.word_id, wordsSelection.start_id) > 0 ||
      compareWordIds(props.word_id, firstWordId.value) == 0
    ) {
      wordsSelection.end_id = props.word_id
    } else if (compareWordIds(props.word_id, wordsSelection.start_id) < 0) {
      // if (wordsSelection.start_id == wordsSelection.end_id) {
      //   wordsSelection.end_id = wordsSelection.start_id
      // }
      wordsSelection.start_id = props.word_id
    }
    // updateSelection()
  }
}

function mouseDown(event: MouseEvent) {
  if (!mouseKeyDown.value) {
    firstWordId.value = props.word_id
    console.log(props.word.word_string)
  }

  mouseKeyDown.value = true
}

// function mouseUp(event: MouseEvent) {
//   // if (mouseKeyDown.value) {
//   mouseKeyDown.value = false
//   // console.log(wordsSelection)
//   console.log({ start_id: wordsSelection.start_id, end_id: wordsSelection.end_id })
//
//   updateSelection()
//   wordsSelection.start_id = ''
//   wordsSelection.end_id = ''
//   // }
// }

let props = defineProps<{
  word: WordToken
  word_id: string
}>()
</script>

<template>
  <n-text
    :class="word_status_class"
    :id="word_id"
    @click="updateWordState"
    @mousemove="mouseMove"
    @mousedown="mouseDown"
  >
    {{ word.word_string }}
  </n-text>
</template>

<style scoped></style>
