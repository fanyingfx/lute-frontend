<template>
  <n-split direction="horizontal" class="min-h-screen" :max="0.75" :min="0.25">
    <template #1>
      <!--  <n-p>Hello</n-p>-->
      <div id="home-box" ref="parentRef" class="h-2/3">
        <div ref="containerRef" class="absolute" style="top:-3000px" id="container">
          <div ref="textContainerRef" id="text-container">
            {{ text }}
          </div>
        </div>
      </div>
    </template>
    <template #2>
      <p>Second</p>
    </template>
  </n-split>

  <!--  </Suspense>-->
</template>

<script setup lang="ts">


import {type TSegment} from "@/Interface"

interface ServerResponse {
  data: TSegment[]
}

const parentRef = ref<HTMLDivElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const textContainerRef = ref<HTMLDivElement | null>(null)
const emit = defineEmits([ 'submitData'])
const count = ref(0)

function repeatTextArray(text: string, times: number) {
  const textArray = [];
  for (let i = 0; i < times; i++) {
    textArray.push(text);
  }
  return textArray;
}

const text = ref('')
let raw_text_arr = repeatTextArray("AVASDFJOFI", 248)
let pageData: any = []

async function addTextUntilOverflow(container: HTMLDivElement | null, parentHeight: number | undefined) {


  if (container === null || parentHeight === undefined)
    return

  let containerHeight = container.clientHeight || 0;
  let pageArray = []


  // 模拟文本高度超过容器高度的情况
  while (containerHeight < parentHeight && raw_text_arr.length > 0) {
    // console.log(containerHeight,parentHeight)
    const nEl = document.createElement('span')
    nEl.style.cssText = "word-wrap: break-word;"
    nEl.innerHTML = raw_text_arr[0]
    textContainerRef.value?.appendChild(nEl)
    containerHeight = textContainerRef.value?.clientHeight || 0
    if (containerHeight <= parentHeight) {
      pageArray.push(raw_text_arr[0])
      raw_text_arr = raw_text_arr.splice(1)
    } else {
      pageData.push(pageArray)
      pageArray = []
      if (textContainerRef.value !== null) {
        textContainerRef.value.innerText = ""
      }
      containerHeight = textContainerRef.value?.clientHeight || 0
    }
    count.value++
  }


}

onMounted(async () => {
  console.log('onmounted', textContainerRef.value)
  if (containerRef.value !== null) {
    containerRef.value.style.width = `${(parentRef.value?.clientWidth || 0)}px`
    containerRef.value.style.height = `${(parentRef.value?.clientHeight || 0)}px`

  }
  await addTextUntilOverflow(textContainerRef.value, parentRef.value?.clientHeight)
  containerRef.value?.remove()
  emit('submitData', pageData)

})
onUpdated(() => {
  console.log("hello")

})

</script>


<style scoped>

</style>