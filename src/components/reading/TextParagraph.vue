<script setup lang="ts">
import type { TextParagraphSegment } from '@/Interface'

import SentenceItem from '@/components/reading/SentenceItem.vue'

defineProps<{
  paragraph: TextParagraphSegment
}>()
</script>

<template>
  <n-p :id="'para' + paragraph.paragraph_order" class="text-wrap border border-b-indigo-600">
    <template v-for="(item, index) in paragraph.segment_value" :key="index">
      <SentenceItem :sentence_segment="item" />
    </template>
  </n-p>
</template>

<style scoped></style>
