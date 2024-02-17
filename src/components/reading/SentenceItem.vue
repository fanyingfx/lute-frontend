<script setup lang="ts">
import WordItem from '@/components/reading/WordItem.vue'
import { type SentenceSegment } from '@/Interface'

const props = defineProps<{
  sentence_segment: SentenceSegment
}>()
// onMounted(()=>
// {
//   console.log(props.sentence_segment)})
const sentence_id = computed(
  () => `para${props.sentence_segment.paragraph_order}_sent${props.sentence_segment.sentence_order}`
)
</script>
<!--    :id="'para' + sentence_segment.paragraph_order + '_sent' + sentence_segment.sentence_order"-->

<template>
  <n-el tag="span" class="border border-t-blue-400" :id="sentence_id">
    <template v-for="(item, index) in sentence_segment.segment_value" :key="index">
      <WordItem :word="item" :word_id="sentence_id + '_' + index" />
    </template>
  </n-el>
</template>

<style scoped></style>
