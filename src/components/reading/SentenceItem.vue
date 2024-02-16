<script setup lang="ts">
import WordItem from '@/components/reading/WordItem.vue'
import { type SentenceSegment } from '@/Interface'

defineProps<{
  sentence_segment: SentenceSegment
}>()
// onMounted(()=>
// {
//   console.log(props.sentence_segment)})
</script>

<template>
  <n-el
    tag="div"
    :id="'para' + sentence_segment.paragraph_order + '_sent' + sentence_segment.sentence_order"
    class="border border-t-blue-400"
  >
    <template v-for="(item, index) in sentence_segment.segment_value" :key="index">
      <WordItem :word="item" :word_id="index + 1" />
    </template>
  </n-el>
</template>

<style scoped></style>
