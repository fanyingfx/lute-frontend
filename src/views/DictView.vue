<script setup lang="ts">
import { selectedWord } from '@/store/WordsSelectionStore'
import { useRoute } from 'vue-router'
// const props=defineProps({
//   dictPrefix: String
// })
const route = useRoute()

const URL = computed(() => {
  const wordLemma = selectedWord.value?.wordLemma ?? ''
  return `/api/dict/query_word?word=${wordLemma}&language_id=${route.query.languageId}`
})
</script>

<template>
  <iframe :src="URL" class="min-h-screen w-full" :allowfullscreen="true"></iframe>
</template>

<style scoped></style>
