<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { currentLanguageId, updateBookPageData, wordState } from '@/store'
import axios from 'axios'
import Service from '@/api/config'
import { Endpoint } from '@/api'

// let wordToken = <Ref<WordToken|null>>inject('wordToken')
const formRef = ref<FormInst | null>(null)

const wordModel = reactive({
  wordString: wordState.value?.wordString,
  wordLemma: wordState.value?.wordLemma,
  wordPos: wordState.value?.wordPos,
  wordExplanation: wordState.value?.wordExplanation,
  wordStatus: wordState.value?.wordStatus ?? 1,
  wordPronunciation: wordState.value?.wordPronunciation,
  wordTokens: [wordState.value?.wordString],
  nextIsWs: false,
  wordCounts: 1,
  languageId: currentLanguageId.value
})

watch(wordState, () => {
  if (wordState.value !== null) {
    wordModel.wordString = wordState.value.wordString
    wordModel.wordExplanation = wordState.value.wordExplanation
    wordModel.wordStatus = wordState.value.wordStatus

    wordModel.wordPos = wordState.value.wordPos
    wordModel.wordLemma = wordState.value.wordLemma
    if (!wordState.value.isMultipleWords) {
      wordModel.wordTokens = [wordState.value.wordString]
      wordModel.wordCounts = 1
    } else if (wordState.value.wordTokens !== undefined) {
      wordModel.wordCounts = wordState.value.wordTokens.length
      wordModel.wordTokens = wordState.value.wordTokens
    }
    wordModel.languageId = currentLanguageId.value
  }
})
// console.log('wordToken',wordState.value)
// console.log('wordModel',wordModel)
async function onFormSubmit() {
  // const formData = JSON.stringify(wordModel)
  console.log('req', wordModel)
  try {
    const res = await Service.post(Endpoint.word.create_or_update, JSON.stringify(wordModel))
    console.log('res', res)
  } catch (e) {
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
  <template v-if="wordState !== null">
    <n-form
      ref="formRef"
      :model="wordModel"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      class="word-form"
    >
      <n-form-item label="word">
        <n-text :strong="true">{{ wordModel.wordString }}</n-text>
      </n-form-item>
      <n-form-item label="Explanation" path="textareaValue">
        <n-input
          v-model:value="wordModel.wordExplanation"
          placeholder="Textarea"
          :style="{ maxWidth: '80%' }"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </n-form-item>
      <n-form-item label="Status" path="status">
        <n-input-number v-model:value="wordModel.wordStatus" />
      </n-form-item>

      <n-form-item label="Pronunciation" path="pronunciation">
        <n-input
          v-model:value="wordModel.wordPronunciation"
          placeholder="Pronunciation"
          :style="{ maxWidth: '80%' }"
          type="text"
        />
      </n-form-item>
      <!--      <n-form-item >-->
      <div style="display: flex; justify-content: flex-end">
        <n-button>Delete</n-button>
        <n-button @click="onFormSubmit">Save</n-button>
      </div>
      <n-text>{{ wordModel.wordTokens }}</n-text>

      <!--      </n-form-item>-->
    </n-form>
    <!--    <pre>{{JSON.stringify(wordModel,null,2)}}</pre>-->
  </template>
</template>

<style scoped>
.word-form {
  width: 80%;
}
</style>
