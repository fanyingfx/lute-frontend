<script setup lang="ts">
import { inject } from 'vue'
import type {WordToken} from "@/Interface";
import type {Ref} from "@vue/runtime-core";
import type{ FormInst, FormItemRule, useMessage } from 'naive-ui'
import {wordState} from "@/state"


// let wordToken = <Ref<WordToken|null>>inject('wordToken')
const formRef = ref<FormInst | null>(null)


const wordModel=reactive({

    word:wordState.value?.word_string,
    lemma: wordState.value?.word_lemma,
    pos: wordState.value?.word_pos,
    explanation:wordState.value?.word_explanation,
    status: wordState.value?.word_status,
    pronunciation: wordState.value?.word_pronunciation
  }
  )

watch(wordState,()=>{
    if(wordState.value!==null){
    wordModel.word = wordState.value.word_string
      wordModel.explanation=wordState.value.word_explanation
      wordModel.status=wordState.value.word_status
    }
})
// console.log('wordToken',wordState.value)
// console.log('wordModel',wordModel)

</script>

<template>
  <template v-if="wordState!==null ">
    <n-form
        ref="formRef"
        :model="wordModel"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        :style="{
      maxWidth: '640px'
    }"
    >
      <n-form-item label="word" >
        <n-text :strong="true" >{{wordModel.word}}</n-text>
      </n-form-item>
      <n-form-item label="Explanation" path="textareaValue">
        <n-input
            v-model:value="wordModel.explanation"
            placeholder="Textarea"
            :style="{maxWidth: '480px'}"
            type="textarea"
            :autosize="{
          minRows: 3,
          maxRows: 5
        }"
        />
      </n-form-item>
      <n-form-item label="Status" path="status">
        <n-text>{{wordModel.status}}</n-text>
      </n-form-item>
      <n-form-item label="Pronunciation" path="pronunciation">
        <n-input
            v-model:value="wordModel.pronunciation"
            placeholder="Pronunciation"
            :style="{maxWidth: '480px'}"
            type="text"

        />
      </n-form-item>
    </n-form>
    <n-flex justify="end">
      <n-button>Delete</n-button>
      <n-button>Save</n-button>

    </n-flex>

  </template>

</template>

<style scoped>

</style>