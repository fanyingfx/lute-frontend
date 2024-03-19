<script setup lang="ts">
import { selectedWord } from '@/store/WordsSelectionStore'

const URL = computed(() => {
  const wordLemma = selectedWord.value?.wordLemma ?? ''
  return `http://127.0.0.1:7171/api/dict/en?word=${wordLemma}`
})
</script>

<template>
  <iframe :src="URL" class="min-h-screen w-full" :allowfullscreen="true"></iframe>
</template>

<style scoped></style>
