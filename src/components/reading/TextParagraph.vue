<!--<script setup lang="ts">-->
<!--import type {SentenceSegment} from "@/Interface"-->

<!--import SentenceItem from "@/components/reading/SentenceItem.vue";-->

<!--const props = defineProps<{-->
<!--  sentences: SentenceSegment[],-->
<!--  paragraph_order: number-->
<!--}>()-->

<!--</script>-->

<!--<template>-->
<!--  <n-p :id="'para'+paragraph_order" class="text-wrap border border-b-indigo-600">-->

<!--    <template v-for="(segment,index)  in sentences" :key="index">-->
<!--      <SentenceItem :sentence="segment.segment_value" :sentence_order="index+1"-->
<!--                :paragraph_order="paragraph_order"></SentenceItem>-->
<!--    </template>-->
<!--  </n-p>-->

<!--</template>-->

<!--<style scoped>-->

<!--</style>-->