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
    <n-flex class="popcard" :id="`popcard_${wordId}`" size="small" vertical>
      <strong>{{ word.wordString }}</strong>
      <n-image
        width="150"
        v-if="word.wordImageSrc"
        :src="wordImagePrefixUrl + '/' + word.wordImageSrc"
      />
      <span class="text-xs">{{ word.wordPronunciation }}</span>
      <span class="whitespace-normal">{{ word.wordExplanation }}</span>
    </n-flex>
  </n-popover>
  <WordText :word-id="wordId" :word="word" v-else />
</template>

<style scoped lang="postcss">
.popcard {
  @apply max-w-[20rem];
}
</style>
