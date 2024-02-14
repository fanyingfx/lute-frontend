<script setup lang="ts">
import type {TokenSentence} from "@/Interface"

import Sentence from "@/components/reading/Sentence.vue";

const props = defineProps<{
  sentences: TokenSentence[],
  paragraph_order: number
}>()

</script>

<template>
  <n-p :id="'para'+paragraph_order" class="text-wrap border border-b-indigo-600">

    <template v-for="(segment,index)  in sentences">
      <Sentence :sentence="segment.segment_value" :sentence_order="index+1"
                :paragraph_order="paragraph_order"></Sentence>
    </template>
  </n-p>

</template>

<style scoped>

</style>