<script setup lang="ts">
// import api from '@/api/apiRequests'
import { wordImages } from '@/store/WordsSelectionStore'
// import {fetchImageUrls} from '@/api/bingSearchImage'
// watchEffect(async () => {
//  images.value= await api.getWordImage("cat")
//   console.log(images)
// })
</script>

<template>
  <n-tabs type="card" tab-style="min-width: 80px;">
    <n-tab-pane name="cat images" tab="cat">
      <n-image v-for="(image, index) in wordImages" :key="index" :src="image"></n-image>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
