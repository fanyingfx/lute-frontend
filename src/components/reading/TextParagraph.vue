<script setup lang="ts">
import type { TextParagraphSegment } from '@/api/Interface'

import SentenceItem from '@/components/reading/SentenceItem.vue'

defineProps<{
  paragraph: TextParagraphSegment
}>()
</script>
<template>
  <n-p :id="'para' + paragraph.paragraphOrder" class="text-wrap">
    <template v-for="item in paragraph.segmentWords" :key="item">
      <SentenceItem :sentence-segment="item" />
    </template>
  </n-p>
</template>

<style scoped></style>
