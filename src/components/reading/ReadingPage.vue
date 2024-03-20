<script setup lang="ts">
import type { TSegment } from '@/api/Interface'
import TextParagraph from '@/components/reading/TextParagraph.vue'

defineProps<{
  segments: TSegment[]
}>()
</script>

<template>
  <div>
    <template v-for="item in segments" :key="item">
      <!-- @vue-ignore -->
      <TextParagraph v-if="item.segmentType === 'textparagraph'" :paragraph="item" />
      <img v-else-if="item.segmentType === 'image'" alt="load failed" :src="item.segmentValue"/>
      <br v-else-if="item.segmentType === 'softlinebreak'" />
      <template v-else-if="item.segmentType === 'hardlinebreak'">
        <br style="display: block; content: ''; margin-top: 1.5rem" />
      </template>
      <pre v-else-if="item.segmentType === 'block'">{{ item.segmentValue }}</pre>
    </template>
  </div>
</template>

<style scoped></style>
