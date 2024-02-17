<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { updateBookPageData, wordState } from '@/store'
import axios from 'axios'

// let wordToken = <Ref<WordToken|null>>inject('wordToken')
const formRef = ref<FormInst | null>(null)

const wordModel = reactive({
  word_string: wordState.value?.word_string,
  word_lemma: wordState.value?.word_lemma,
  word_pos: wordState.value?.word_pos,
  word_explanation: wordState.value?.word_explanation,
  word_status: wordState.value?.word_status,
  word_pronunciation: wordState.value?.word_pronunciation,
  word_tokens: [wordState.value?.word_string],
  next_is_ws: false,
  word_counts: 1
})

watch(wordState, () => {
  if (wordState.value !== null) {
    wordModel.word_string = wordState.value.word_string
    wordModel.word_explanation = wordState.value.word_explanation
    wordModel.word_status = wordState.value.word_status
    wordModel.word_pos = wordState.value.word_pos
    wordModel.word_lemma = wordState.value.word_lemma
    if (!wordState.value.is_multiple_words) {
      wordModel.word_tokens = [wordState.value.word_string]
      wordModel.word_counts = 1
    } else if (wordState.value.word_tokens !== undefined) {
      wordModel.word_counts = wordState.value.word_tokens.length
      wordModel.word_tokens = wordState.value.word_tokens
    }
  }
})
// console.log('wordToken',wordState.value)
// console.log('wordModel',wordModel)
async function onFormSubmit() {
  const url = 'http://127.0.0.1:8000/word/create_or_update'
  // const formData = JSON.stringify(wordModel)
  console.log('req', wordModel)
  try {
    const res = await axios.post(url, JSON.stringify(wordModel))
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
        <n-text :strong="true">{{ wordModel.word_string }}</n-text>
      </n-form-item>
      <n-form-item label="Explanation" path="textareaValue">
        <n-input
          v-model:value="wordModel.word_explanation"
          placeholder="Textarea"
          :style="{ maxWidth: '480px' }"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </n-form-item>
      <n-form-item label="Status" path="status">
        <n-input-number v-model:value="wordModel.word_status" />
      </n-form-item>

      <n-form-item label="Pronunciation" path="pronunciation">
        <n-input
          v-model:value="wordModel.word_pronunciation"
          placeholder="Pronunciation"
          :style="{ maxWidth: '480px' }"
          type="text"
        />
      </n-form-item>
      <!--      <n-form-item >-->
      <div style="display: flex; justify-content: flex-end">
        <n-button>Delete</n-button>
        <n-button @click="onFormSubmit">Save</n-button>
      </div>
      <n-text>{{ wordModel.word_tokens }}</n-text>

      <!--      </n-form-item>-->
    </n-form>
    <!--    <pre>{{JSON.stringify(wordModel,null,2)}}</pre>-->
  </template>
</template>

<style scoped>
.word-form {
  width: 280px;

  ::v-deep(.n-form-item .n-form-item-label .n-form-item-label__asterisk) {
    --n-asterisk-color: red;
  }

  ::v-deep(.n-form-item .n-form-item-feedback-wrapper) {
    --n-feedback-height: 10px;
  }
}
</style>
