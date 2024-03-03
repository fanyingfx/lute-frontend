<script setup lang="ts">
import { type WordToken } from '@/Interface'
import WordText from '@/components/reading/WordText.vue'

// https://tailwindcss.com/docs/text-color

// const trigger_type = computed(() => (props.word.word_status > 0 ? 'hover' : 'manual'))
// const textState = useTextSelection()

const props = defineProps<{
  word: WordToken
  wordId: string
}>()
</script>

<template>
  <n-popover v-if="word.wordStatus > 0" placement="bottom" trigger="hover">
    <template #trigger>
      <WordText :word-id="wordId" :word="word" />
    </template>
    <n-card :id="`popcard_${wordId}`" :title="word.wordString">
      <n-text>{{ word.wordExplanation }}</n-text>
    </n-card>
  </n-popover>
  <WordText :word-id="wordId" :word="word" v-else />
</template>

<style scoped>
.word_text {
  font-size: 1.2rem;
  margin-bottom: 9.5px;
}
</style>
