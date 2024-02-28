<script setup lang="ts">
import type { TextParagraphSegment } from '@/Interface'

import SentenceItem from '@/components/reading/SentenceItem.vue'

defineProps<{
  paragraph: TextParagraphSegment
}>()
</script>

<template>
  <n-p :id="'para' + paragraph.paragraphOrder" class="text-wrap">
    <template v-for="(item, index) in paragraph.segmentWords" :key="index">
      <SentenceItem :sentence-segment="item" />
    </template>
  </n-p>
</template>

<style scoped></style>
