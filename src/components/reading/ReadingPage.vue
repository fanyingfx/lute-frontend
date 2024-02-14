<script setup lang="ts">

import type {TSegment} from "@/Interface";
import TextParagraph from "@/components/reading/TextParagraph.vue";
defineProps<{
  segments:TSegment[]
}>();

</script>

<template>
  <n-el tag="div" class="border border-b-fuchsia-300">
  <template v-for="segment in segments" class="text-left">
    <TextParagraph v-if="segment.segment_type==='textparagraph'" :sentences="segment.segment_value" :paragraph_order="segment.segment_order"></TextParagraph>
    <n-image v-else-if="segment.segment_type==='image' " :alt="segment.segment_value">{{segment.segment_value}}</n-image>
    <br v-else-if="segment.segment_type==='softlinebreak'"/>
    <template v-else-if="segment.segment_type==='hardlinebreak'">
      <br/><br/>
    </template>
    <pre v-else-if="segment.segment_type==='block'">{{segment.segment_value}}</pre>
  </template>
  </n-el>

</template>

<style scoped>

</style>