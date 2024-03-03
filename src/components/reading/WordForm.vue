<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { currentLanguageId, updateBookPageData, wordState } from '@/store'
import { KyService } from '@/api/config'
import { Endpoint } from '@/api'
import type { WordToken } from '@/Interface'

// let wordToken = <Ref<WordToken|null>>inject('wordToken')
const formRef = ref<FormInst | null>(null)
interface IWordModel {
  wordString: string
  wordLemma: string
  wordPos: string
  wordExplanation: string
  wordStatus: number
  wordPronunciation: string
  wordTokens: string[]
  nextIsWs: boolean
  wordCounts: number
  languageId: number
  wordDbId?: number
}
// const wordModel = reactive<IWordModel>(null)
const wordModel = reactive<IWordModel>({
  wordString: wordState.value?.wordString ?? '',
  wordLemma: '',
  wordPos: 'n',
  wordExplanation: '',
  wordStatus: 1,
  wordPronunciation: '',
  wordTokens: [''],
  nextIsWs: false,
  wordCounts: 1,
  languageId: currentLanguageId.value,
  wordDbId: -1
})

watch(wordState, () => {
  if (wordState.value !== null) {
    wordModel.wordString = wordState.value.wordString
    wordModel.wordExplanation = wordState.value.wordExplanation ?? ''
    wordModel.wordStatus = wordState.value.wordStatus
    wordModel.wordPos = wordState.value.wordPos ?? ''
    wordModel.wordLemma = wordState.value.wordLemma
    if (!wordState.value.isMultipleWords) {
      wordModel.wordTokens = [wordState.value.wordString]
      wordModel.wordCounts = 1
    } else if (wordState.value.wordTokens !== undefined) {
      wordModel.wordCounts = wordState.value.wordTokens.length
      wordModel.wordTokens = wordState.value.wordTokens
    }
    wordModel.wordDbId = wordState.value.wordDbId
    wordModel.languageId = currentLanguageId.value
  }
})
async function onFormSubmit() {
  try {
    delete wordModel['wordDbId']
    console.log('req', wordModel)
    const res = await KyService.post(Endpoint.word.create_or_update, {
      json: wordModel
    }).json<WordToken>()
    wordModel.wordDbId = res.wordDbId
    // console.log('res', resData)
  } catch (e) {
    console.log(e)
  }
  await updateBookPageData()
  // const {data} = await axios.get<ServerResponse>(Endpoint.book.test_parser, { params: { booktext_id: 1 } })
  // bookPageData.value=bookDatapaginate(data.data, wordsPerPage.value)
  // console.log('update bookPageData',bookPageData.value)
  //
}
async function onDelete() {
  console.log(`delete Word ${wordModel.wordString}, dbId=${wordModel.wordDbId}`)
  try {
    const res = await KyService.delete(`${Endpoint.word.delete}/${wordModel.wordDbId}`)
    console.log('res', res)
  } catch (e) {
    console.log(e)
  }

  await updateBookPageData()
  wordModel.wordStatus = 1
  wordModel.wordDbId = -1
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
        <n-button v-if="wordModel.wordDbId > 0" @click="onDelete">Delete</n-button>
        <n-button @click="onFormSubmit">Save</n-button>
      </div>
      <n-text>{{ wordModel.wordTokens }}</n-text>

      <!--      </n-form-item>-->
    </n-form>
    <pre>{{ JSON.stringify(wordModel, null, 2) }}</pre>
  </template>
</template>

<style scoped>
.word-form {
  width: 80%;
}
</style>
