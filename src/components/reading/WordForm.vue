<script setup lang="ts">
import { inject } from 'vue'
import type { ServerResponse, WordToken } from '@/Interface'
import type {Ref} from "vue";
import type{ FormInst, FormItemRule, useMessage } from 'naive-ui'
import { wordState, updateBookPageData, wordsPerPage } from '@/state'
import axios from 'axios'
import { Endpoint } from '@/api'
import { bookDatapaginate } from '@/utils/TextUtils'


// let wordToken = <Ref<WordToken|null>>inject('wordToken')
const formRef = ref<FormInst | null>(null)


const wordModel=reactive({

    word_string:wordState.value?.word_string,
    word_lemma: wordState.value?.word_lemma,
    word_pos: wordState.value?.word_pos,
    word_explanation:wordState.value?.word_explanation,
    word_status: wordState.value?.word_status,
    word_pronunciation: wordState.value?.word_pronunciation,
    word_tokens: [wordState.value?.word_string],
  word_counts: 1
  }
  )

watch(wordState,()=>{
    if(wordState.value!==null){
      // Object.assign(wordModel,wordState.value)
    wordModel.word_string = wordState.value.word_string
      wordModel.word_explanation=wordState.value.word_explanation
      wordModel.word_status=wordState.value.word_status
      wordModel.word_pos = wordState.value.word_pos
      wordModel.word_lemma = wordState.value.word_lemma
      wordModel.word_tokens= [wordState.value.word_string]
      wordModel.word_counts = 1

    }
})
// console.log('wordToken',wordState.value)
// console.log('wordModel',wordModel)
async function onFormSubmit(){
  const url = 'http://127.0.0.1:8000/word/create_or_update'
  // const formData = JSON.stringify(wordModel)
  console.log('req',wordModel)
  try{
    const res =await axios.post(url,JSON.stringify( wordModel))
    console.log('res',res)
  }catch (e){
    console.log(e)

  }
  await updateBookPageData()
  // const {data} = await axios.get<ServerResponse>(Endpoint.book.test_parser, { params: { booktext_id: 1 } })
  // bookPageData.value=bookDatapaginate(data.data, wordsPerPage.value)
  // console.log('update bookPageData',bookPageData.value)
  //


}

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
        <n-text :strong="true" >{{ wordModel.word_string }}</n-text>
      </n-form-item>
      <n-form-item label="Explanation" path="textareaValue">
        <n-input
            v-model:value="wordModel.word_explanation"
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
        <n-input-number v-model:value="wordModel.word_status"/>
      </n-form-item>

      <n-form-item label="Pronunciation" path="pronunciation">
        <n-input
            v-model:value="wordModel.word_pronunciation"
            placeholder="Pronunciation"
            :style="{maxWidth: '480px'}"
            type="text"

        />
      </n-form-item>
    </n-form>
<!--    <pre>{{JSON.stringify(wordModel,null,2)}}</pre>-->
    <n-flex justify="end">
      <n-button >Delete</n-button>
      <n-button @click="onFormSubmit">Save</n-button>

    </n-flex>

  </template>

</template>

<style scoped>

</style>