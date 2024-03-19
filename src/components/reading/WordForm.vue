<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { currentLanguageId } from '@/store/BookDataStore'
import api from '@/api/apiRequests'
import { wordImagePrefixUrl } from '@/api/apiEndpoint'
import {
  resetWordsSelection,
  selectedWord,
  wordImages,
  imageRef
} from '@/store/WordsSelectionStore'

import { useRoute } from 'vue-router'
// let wordToken = <Ref<WordToken|null>>inject('wordToken')
const formRef = ref<FormInst | null>(null)
const props = defineProps({
  updateBookData: Function
})

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
  wordImageSrc: string | null
  languageId: number
  wordDbId: number
}

const route = useRoute()
currentLanguageId.value = Number(route.query.languageId as string)
const wordModel = reactive<IWordModel>({
  wordString: selectedWord.value?.wordString.trim() ?? '',
  wordLemma: '',
  wordPos: 'n',
  wordExplanation: '',
  wordStatus: 1,
  wordPronunciation: '',
  wordTokens: [''],
  nextIsWs: selectedWord.value?.nextIsWs ?? false,
  wordCounts: 1,
  languageId: currentLanguageId.value,
  wordImageSrc: null,
  wordDbId: -1
})

watch(selectedWord, () => {
  Object.assign(wordModel, selectedWord.value)
  wordModel.languageId = currentLanguageId.value
  wordModel.wordCounts = selectedWord.value!.wordTokens.length
  if (selectedWord.value!.wordImageSrc) {
    imageRef.value = [
      {
        id: 'a',
        name: selectedWord.value!.wordImageSrc,
        status: 'finished',
        url: `${wordImagePrefixUrl}/${selectedWord.value!.wordImageSrc}`
      }
    ]
  } else {
    imageRef.value = []
  }
})
const loadingSearchImage = ref(false)
async function onSearchImage() {
  loadingSearchImage.value = true
  wordImages.value = await api.getWordImages(wordModel.wordString)
  loadingSearchImage.value = false
}

async function onFormSubmit() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { wordImageSrc: _, ...req } = wordModel
    // console.log('req', wordModel)
    const wordToken = await api.createOrUpdateWord(req)
    wordModel.wordDbId = wordToken.wordDbId
    if (imageRef.value.length > 0 && wordToken.wordDbId > 0) {
      // if image exists, update word_image
      const file_ext = imageRef.value[0].name.split('.')[1]
      const wordImageName = `${wordToken.wordString}.${file_ext}`
      // check if file uploaded
      if ('file' in imageRef.value[0]) {
        const params = {
          save_local: true,
          word_image_name: wordImageName,
          word_id: wordToken.wordDbId!,
          file: imageRef.value[0].file!
        }
        await api.uploadWordImage(params)
      }
      wordModel.wordImageSrc = wordImageName
    }
    await api.updateWordIndex(wordModel.languageId, wordModel.wordTokens[0])
    await props.updateBookData!()
    resetWordsSelection()
  } catch (e) {
    console.log(e)
  }
}

async function onDelete() {
  await api.deleteWord(wordModel.wordDbId)
  await api.updateWordIndex(wordModel.languageId, wordModel.wordTokens[0])
  await props.updateBookData!()
  wordModel.wordStatus = 1
  wordModel.wordDbId = -1
  resetWordsSelection()
}

// console.log('wordModel', wordModel)
</script>

<template>
  <template v-if="selectedWord !== null">
    <n-form
      ref="formRef"
      :model="wordModel"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      class="word-form"
      size="small"
    >
      <n-form-item label="word">
        <n-text :strong="true">{{ wordModel.wordString }}</n-text>
      </n-form-item>

      <n-form-item label="image">
        <n-flex>
          <n-upload
            action="/api/word/upload_word_image"
            v-model:file-list="imageRef"
            list-type="image-card"
            :max="1"
          >
          </n-upload>
          <n-button icon-placement="left" :loading="loadingSearchImage" @click="onSearchImage"
            >Search!</n-button
          >
        </n-flex>
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
      <div style="display: flex; justify-content: flex-end">
        <n-button v-if="wordModel.wordDbId > 0" @click="onDelete">Delete</n-button>
        <n-button @click="onFormSubmit">Save</n-button>
      </div>
    </n-form>
  </template>
</template>

<style scoped>
.word-form {
  width: 80%;
}
</style>
