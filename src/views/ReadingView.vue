<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { NButton, NText } from 'naive-ui'
import type { WordToken } from '@/Interface'
import TextReadingComponent from '@/components/reading/ReadingPage.vue'
import {
  ChevronBackSharp as BackSharp,
  ChevronForwardSharp as ForwardSharp
} from '@vicons/ionicons5'
import WordForm from '@/components/reading/WordForm.vue'
// import { bookDatapaginate } from '@/utils/TextUtils'
import { bookPageData as pagedData, updateBookPageData } from '@/store'

// const wordsPerPage = 800
const currentPage = ref(1)
// let loading = false

const currentPageData = computed(() => {
  return pagedData.value[currentPage.value - 1]
})
// let allData = [] as TSegment[]
const readingPanelRef = ref(null)
// const pagedData = ref<TSegment[][]>([[{
//   'segment_type': 'softlinebreak',
//   segment_value: '',
//   segment_raw: '',
//   segment_order: 0
// }]])
const totalPages = computed(() => Math.ceil(pagedData.value.length))

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
  console.log(currentPage.value, currentPageData.value)
}

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
  console.log(currentPage.value, currentPageData.value)
}
// watch(bookPageData, async ()=>{
//   console.log('bookPageDataChanged',bookPageData)
//   pagedData.value=bookPageData.value
// })

watchEffect(async () => {
  // const {data} = await axios.get<ServerResponse>(Endpoint.book.test_parser, { params: { booktext_id: 1 } })
  // pagedData.value=bookDatapaginate(data.data, wordsPerPage.value)
  await updateBookPageData()
})

const currentWordToken = ref<WordToken | null>(null)
provide('wordToken', currentWordToken)
</script>
<template>
  <n-split direction="horizontal" class="min-h-screen" :max="0.75" :min="0.25">
    <template #1>
      <n-flex class="border border-sky-500" vertical id="left_pane" style="height: 100%">
        <n-flex
          ref="readingPanelRef"
          class="border border-amber-300 w-4/5 text-center center_by_margin"
          justify="center"
          align="center"
          :inline="true"
          :wrap="false"
        >
          <n-button
            icon-placement="left"
            round
            tertiary
            size="small"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            <n-icon :component="BackSharp" />
          </n-button>
          <n-slider v-model:value="currentPage" :step="1" :min="1" :max="totalPages" />
          <n-button
            icon-placement="right"
            round
            tertiary
            size="small"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            <n-icon :component="ForwardSharp" />
          </n-button>
          <n-text class="text-left">{{ currentPage }}/{{ totalPages }}</n-text>
        </n-flex>
        <n-el
          tag="div"
          class="w-4/5 h-4/5 center_by_margin border border-orange-900"
          style="margin-top: 5%"
        >
          <TextReadingComponent :segments="currentPageData" />
        </n-el>
      </n-flex>
    </template>
    <template #2>
      <n-split direction="vertical" style="height: 100%">
        <template #1>
          <n-h1>DB Word Page</n-h1>
          <WordForm />
          <!--          <span>Work In Process</span>-->
        </template>
        <template #2>
          <n-h1>Dictionary Word Page</n-h1>
          <span>Work In Process</span>
        </template>
      </n-split>
    </template>
  </n-split>
  <!--  </n-space>-->
</template>
<style scoped>
.center_by_margin {
  margin-left: 10%;
}
</style>
