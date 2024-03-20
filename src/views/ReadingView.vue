<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { NButton, NText } from 'naive-ui'
import api from '@/api/apiRequests'
import TextReadingComponent from '@/components/reading/ReadingPage.vue'
import {
  ChevronBackSharp as BackSharp,
  ChevronForwardSharp as ForwardSharp,
  Home
} from '@vicons/ionicons5'
import WordForm from '@/components/reading/WordForm.vue'
import { bookPageData as pagedData } from '@/store/BookDataStore'
import { resetWordsSelection, wordSelectEnd, wordsPerPage } from '@/store/WordsSelectionStore'
import { useRoute, useRouter } from 'vue-router'
import SearchImage from '@/components/reading/SearchImage.vue'
import DictView from '@/views/DictView.vue'
import { bookDatapaginate } from '@/utils/TextUtils'

// Data properties
const currentPage = ref(1)
const readingPanelRef = ref(null)
const route = useRoute()
const router = useRouter()

// Computed properties
const currentPageData = computed(() => pagedData.value[currentPage.value - 1])
const totalPages = computed(() => Math.ceil(pagedData.value.length))

// Methods
const updatePage = async (page: number) => {
  try {
    await api.updateBooktextPagenum(Number(route.params.bookId), page)
  } catch (error) {
    console.error('updatePage error', error)
  }

  // await api.updateBooktextPagenum(Number(route.params.bookId), page)
  // console.log('route.path', route.path, route.query, page)
  await router.push({ path: route.path, query: { ...route.query, currentPage: page } })
}

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
  await updatePage(currentPage.value)
}

const prevPage = async () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
  await updatePage(currentPage.value)
}

// Lifecycle hooks
onMounted(() => {
  console.log('ReadingView onMounted ')
})

onUnmounted(() => {
  console.log('ReadingView onUnMounted')
  resetWordsSelection()
})

async function getBookData() {
  return await api.getBooktextTest(route.params.bookId as string)
}

async function updataBookData() {
  const bookData = await getBookData()
  console.log('get bookData', bookData)
  pagedData.value = bookDatapaginate(bookData, wordsPerPage.value)
  console.log('pagedData', pagedData.value)
}

// Watchers and provides
watchEffect(async () => {
  // await updateBookPageData(route.params.bookId as string)
  await updataBookData()
  currentPage.value = route.query.currentPage ? Number(route.query.currentPage) : 1
})
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
    @mouseup="wordSelectEnd"
    :max="0.75"
    :min="0.25"
    class="reading-panel"
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
      <n-split direction="vertical" class="max-h-[100vh]">
        <template #1>
          <n-scrollbar class="max-h-[50vh]">
            <WordForm :update-book-data="updataBookData" />
          </n-scrollbar>
        </template>
        <template #2>
          <n-scrollbar class="max-h-[50vh]">
            <n-tabs type="card">
              <n-tab-pane name="dict" tab="Dict">
                <DictView />
              </n-tab-pane>
              <n-tab-pane name="image" tab="Image">
                <SearchImage />
              </n-tab-pane>
            </n-tabs>
          </n-scrollbar>
        </template>
      </n-split>
    </template>
  </n-split>
</template>
<style scoped>
.center_by_margin {
  margin-left: 10%;
}

.reading-panel {
  min-height: 95vh;
}
</style>
