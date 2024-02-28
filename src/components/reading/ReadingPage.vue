<script setup lang="ts">
import type { TSegment } from '@/Interface'
import TextParagraph from '@/components/reading/TextParagraph.vue'

defineProps<{
  segments: TSegment[]
}>()
</script>

<template>
  <n-el tag="div">
    <template v-for="(item, index) in segments" :key="index">
      <!-- @vue-ignore -->
      <TextParagraph v-if="item.segmentType === 'textparagraph'" :paragraph="item" />
      <n-image v-else-if="item.segmentType === 'image'" :alt="item.segmentValue"
        >{{ item.segmentValue }}
      </n-image>
      <br v-else-if="item.segmentType === 'softlinebreak'" />
      <template v-else-if="item.segmentType === 'hardlinebreak'">
        <br style="display: block; content: ''; margin-top: 1.5rem" />
      </template>
      <pre v-else-if="item.segmentType === 'block'">{{ item.segmentValue }}</pre>
    </template>
  </n-el>
</template>

<style scoped></style>
