<script setup lang="ts">
import {computed, ref} from 'vue';
import {NButton, NText} from "naive-ui";
import {Endpoint} from "@/api"
import type{ TSegment,WordToken} from "@/Interface"
import axios from "axios";
import TextReadingComponent from "@/components/reading/ReadingPage.vue";
import {ChevronBackSharp as BackSharp, ChevronForwardSharp as ForwardSharp} from '@vicons/ionicons5';
import WordForm from "@/components/reading/WordForm.vue";

import { provide } from 'vue'



defineComponent({
  components: {
    BackSharp, ForwardSharp
  }
})
const wordsPerPage = 1500;
const currentPage = ref(1);
let loading = false

const currentPageData = computed(() => {
  let res = pagedData.value[currentPage.value-1]
  return res
})
let allData = <TSegment[]>[]
const readingPanelRef = ref(null)
const pagedData = ref<TSegment[][]>([[{"segment_type": "softlinebreak", segment_value: "", segment_raw: "",segment_order:0}]])
const totalPages = computed(() => Math.ceil(pagedData.value.length));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};
interface ServerResponse {
  data: TSegment[]
}
watchEffect(async () => {
  if (loading)
    return

  const response = await axios.get<ServerResponse>(Endpoint.book.test_parser, {params: {booktext_id: 2}})
  allData = response.data.data
  let temPageData = <TSegment[][]>[]
  let perPageData = <TSegment[]>[]
  let pageDataHasText = false
  let pageSegmentsCount = 0
  let currentSegmentLength = 0
  for (let segment of allData) {
    switch (segment.segment_type) {
      case 'textparagraph':
        currentSegmentLength = pageSegmentsCount + segment.segment_raw.length;
        // pageDataHasText = true
        break
      case 'softlinebreak':
        currentSegmentLength += 5
        break
      case 'hardlinebreak':
        currentSegmentLength += 25
        break
    }
    if (currentSegmentLength < wordsPerPage || !pageDataHasText) {
      perPageData.push(segment)
      if(segment.segment_type==='textparagraph'){
        pageDataHasText = true
      }
      pageSegmentsCount = currentSegmentLength
    } else {

      temPageData.push(perPageData)
      pageSegmentsCount = 0
      currentSegmentLength=0
      perPageData = []
      pageDataHasText=false
    }


  }
  if(perPageData.length>0){
    temPageData.push(perPageData)
    perPageData=[]
  }

  pagedData.value = temPageData

  loading = true

})

const currentWordToken = ref<WordToken|null>(null)
provide('wordToken', currentWordToken)


</script>
<template>


  <n-split direction="horizontal" class="min-h-screen" :max="0.75" :min="0.25">
    <template #1>
      <n-flex class="border border-sky-500" vertical id="left_pane" style="height: 100%;">
        <n-flex ref="readingPanelRef" class="border border-amber-300 w-4/5 text-center center_by_margin"
                justify="center" align="center" :inline="true" :wrap="false">
          <n-button icon-placement="left" round tertiary size="small" @click="prevPage" :disabled="currentPage === 1">
            <n-icon :component="BackSharp"/>
          </n-button>
          <n-slider v-model:value="currentPage" :step="1" :min="1" :max="totalPages"/>
          <n-button icon-placement="right" round tertiary size="small" @click="nextPage"
                    :disabled="currentPage === totalPages">
            <n-icon :component="ForwardSharp"/>
          </n-button>
          <n-text class="text-left">{{ currentPage }}/{{ totalPages }}</n-text>
        </n-flex>
        <n-space class="w-4/5 center_by_margin" style="margin-top: 5%"  >


        <TextReadingComponent :segments="currentPageData" />

        </n-space>
      </n-flex>

    </template>
    <template #2>
      <n-split direction="vertical" style="height: 100%">
        <template #1>
          <n-h1>DB Word Page </n-h1>
          <WordForm/>
<!--          <span>Work In Process</span>-->

        </template>
        <template #2>
          <n-h1>Dictionary Word Page </n-h1>
          <span>Work In Process</span>
        </template>
      </n-split>
    </template>

  </n-split>
  <!--  </n-space>-->
</template>
<style scoped>
.center_by_margin{
  margin-left: 10%;
}

</style>
