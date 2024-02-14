<script setup lang="ts">
import Word from "@/components/reading/Word.vue";
import {type WordToken} from "@/Interface"

const props = defineProps<{
  sentence: WordToken[],
  sentence_order: number,
  paragraph_order:number,
}>()
</script>

<template>
  <n-el :id="'para'+paragraph_order+'_sent'+sentence_order" tag="span" class="border border-t-blue-400">

  <template  v-for="(word,index) in sentence" >
    <Word :word="word" :word_id="index+1" />
  </template>
  </n-el>


</template>

<style scoped>

</style>