<script setup lang="ts">
import { type WordToken } from '@/api/Interface'
import WordText from '@/components/reading/WordText.vue'
import { wordImagePrefixUrl } from '@/api/apiEndpoint'

// const props =
defineProps<{
  word: WordToken
  wordId: string
}>()
</script>

<template>
  <n-popover v-if="word.wordStatus > 0" placement="bottom" trigger="hover">
    <template #trigger>
      <WordText :word-id="wordId" :word="word" />
    </template>
    <n-flex :id="`popcard_${wordId}`" size="small" vertical>
      <n-text strong>{{ word.wordString }}</n-text>
      <n-image v-if="word.wordImageSrc" :src="wordImagePrefixUrl + '/' + word.wordImageSrc" />
      <n-text class="text-xs">{{ word.wordPronunciation }}</n-text>
      <n-text>{{ word.wordExplanation }}</n-text>
    </n-flex>
  </n-popover>
  <WordText :word-id="wordId" :word="word" v-else />
</template>

<style scoped>
.word_text {
  font-size: 1.2rem;
  margin-bottom: 9.5px;
}
</style>
