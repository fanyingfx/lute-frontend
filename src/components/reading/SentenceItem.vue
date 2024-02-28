<script setup lang="ts">
import WordItem from '@/components/reading/WordItem.vue'
import { type ParsedTextSegment } from '@/Interface'

const props = defineProps<{
  sentenceSegment: ParsedTextSegment
}>()
// onMounted(()=>
// {
//   console.log(props.sentence_segment)})
const sentenceId = computed(
  () => `para${props.sentenceSegment.paragraphOrder}_sent${props.sentenceSegment.sentenceOrder}`
)
</script>
<!--    :id="'para' + sentence_segment.paragraph_order + '_sent' + sentence_segment.sentence_order"-->

<template>
  <span class="sentence" :id="sentenceId">
    <template v-for="(item, index) in sentenceSegment.segmentWords" :key="index">
      <WordItem :word="item" :word-id="sentenceId + '_' + index" />
    </template>
  </span>
</template>

<style scoped>
span.sentence {
  @apply border-r-2 border-r-amber-300;
}
</style>
