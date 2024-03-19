<script setup lang="ts">
// import api from '@/api/apiRequests'
import { wordImages } from '@/store/WordsSelectionStore'
import { imageRef } from '@/store/WordsSelectionStore'
import ky from 'ky'
async function handleImageClick(image_url: string) {
  console.log(image_url)
  const imageBlob = await ky.get(image_url).blob()
  const fileExt = imageBlob.type.split('/')[1]
  const file = new File([imageBlob], `image.${fileExt}`, { type: imageBlob.type })
  imageRef.value = [
    {
      id: 'a',
      name: file.name,
      file: file,
      // url: image_url,
      status: 'finished'
    }
  ]
}
</script>

<template>
  <n-image
    v-for="(image, index) in wordImages"
    width="150"
    @click="handleImageClick(image)"
    :preview-disabled="true"
    class="hover:border-amber-200 border-2"
    :key="index"
    :src="image"
  ></n-image>
</template>

<style scoped></style>
