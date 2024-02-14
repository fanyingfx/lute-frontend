<script setup lang="ts">
import {type WordToken} from "@/Interface"
// import type {Ref} from "@vue/runtime-core";
// import {inject} from "vue";
import {wordState} from "@/state"

// https://tailwindcss.com/docs/text-color
const status_color: { [key: string]: string } = {
  "0": 'text-sky-600',
  "1": "text-yellow-600",
  "2": "text-lime-600",
  "3": "text-violet-600",
  "4": "text-orange-600",
  "5": "text-red-600",
  "99": "text-black",
  "-1": "text-black"
}
const word_class='whitespace-normal inline-block .word_text'


const trigger_type = computed(()=> props.word.word_status>0?"hover":"manual")


let props = defineProps<{
  word: WordToken,
  word_id: Number
}>()
const theme = ref(null)
const word_status_class=computed(()=>status_color[`${props.word.word_status}`]
)
function renderText(){
  return h(
      'n-text',{
        id:`word_${props.word_id}`,
        class: ['whitespace-normal','inline-block', '.word_text', `${word_status_class.value}`,"border border-x-emerald-400"],
        dataStatus:`${props.word.word_status}`,
        onClick(){
          // update word state with current word
          wordState.value=props.word
        }
      },
      props.word.word_string
  )
}



</script>

<template>

  <n-popover v-if="word.word_status>0" placement="bottom" trigger="hover">
    <template #trigger>
      <renderText/>
    </template>
    <n-card :title="word.word_string">
      <n-text>{{word.word_explanation}}</n-text>
    </n-card>
  </n-popover>
  <renderText v-else/>

  <n-text class="whitespace-normal inline-block" v-if="word.next_is_ws">&nbsp</n-text>
</template>

<style scoped>
.word_text{
  font-size: 1.2rem;
  margin-bottom: 9.5px;
}

</style>