<script setup lang="ts">
import { type WordToken } from '@/Interface'
import WordText from '@/components/reading/WordText.vue'

// https://tailwindcss.com/docs/text-color

// const trigger_type = computed(() => (props.word.word_status > 0 ? 'hover' : 'manual'))
// const textState = useTextSelection()

let props = defineProps<{
  word: WordToken
  word_id: string
}>()
</script>

<template>
  <n-popover v-if="word.word_status > 0" placement="bottom" trigger="hover">
    <template #trigger>
      <WordText :word_id="word_id" :word="word" />
    </template>
    <n-card :title="word.word_string">
      <n-text>{{ word.word_explanation }}</n-text>
    </n-card>
  </n-popover>
  <WordText :word_id="word_id" :word="word" v-else />
  <n-text class="whitespace-normal inline-block" v-if="word.next_is_ws">&nbsp;</n-text>
</template>

<style scoped>
.word_text {
  font-size: 1.2rem;
  margin-bottom: 9.5px;
}
</style>
