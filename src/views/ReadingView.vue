<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { NButton, NText } from 'naive-ui'
import type { WordToken } from '@/api/Interface'
import TextReadingComponent from '@/components/reading/ReadingPage.vue'
import {
  ChevronBackSharp as BackSharp,
  ChevronForwardSharp as ForwardSharp,
  Home
} from '@vicons/ionicons5'
import WordForm from '@/components/reading/WordForm.vue'
import { bookPageData as pagedData, updateBookPageData } from '@/store/BookDataStore'
import { resetWordsSelection, wordSelectEnd } from '@/store/WordsSelectionStore'
import { useRoute } from 'vue-router'
import SearchImage from '@/components/reading/SearchImage.vue'

const currentPage = ref(1)

const currentPageData = computed(() => {
  return pagedData.value[currentPage.value - 1]
})
const readingPanelRef = ref(null)
const totalPages = computed(() => Math.ceil(pagedData.value.length))
onMounted(() => {
  console.log('ReadingView onMounted ')
})
onUnmounted(() => {
  console.log('ReadingView onUnMounted')

  resetWordsSelection()
})
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
const route = useRoute()
watchEffect(async () => {
  await updateBookPageData(route.params.bookId as string)
})

const currentWordToken = ref<WordToken | null>(null)
provide('wordToken', currentWordToken)
</script>
<template>
  <n-breadcrumb>
    <n-breadcrumb-item>
      <RouterLink to="/home">
        <n-icon :component="Home" />
        Home
      </RouterLink>
    </n-breadcrumb-item>
  </n-breadcrumb>
  <n-split
    direction="horizontal"
    class="min-h-screen"
    @mouseup="wordSelectEnd"
    :max="0.75"
    :min="0.25"
  >
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
          <n-scrollbar style="height: 100%">
            <n-h1>DB Word Page</n-h1>
            <WordForm />
          </n-scrollbar>
          <!--          <span>Work In Process</span>-->
        </template>
        <template #2>
          <n-h1>Dictionary Word Page</n-h1>
          <SearchImage />
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
