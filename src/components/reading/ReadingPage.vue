<script setup lang="ts">
import type { TSegment } from '@/Interface'
import TextParagraph from '@/components/reading/TextParagraph.vue'

defineProps<{
  segments: TSegment[]
}>()
</script>

<template>
  <n-el tag="div" class="border border-b-fuchsia-300">
    <template v-for="(item, index) in segments" :key="index">
      <TextParagraph v-if="item.segment_type === 'textparagraph'" :paragraph="item" />
      <n-image v-else-if="item.segment_type === 'image'" :alt="item.segment_value">{{
        item.segment_value
      }}</n-image>
      <br v-else-if="item.segment_type === 'softlinebreak'" />
      <template v-else-if="item.segment_type === 'hardlinebreak'">
        <br style="display: block; content: ''; margin-top: 1.5rem" />
      </template>
      <pre v-else-if="item.segment_type === 'block'">{{ item.segment_value }}</pre>
    </template>
  </n-el>
</template>

<style scoped></style>
