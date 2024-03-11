import { Endpoint } from '@/api/apiEndpoint'
import KyService from '@/api/config'
import type { BookList, BookTextResponse } from '@/api/Interface'

async function getBooklist() {
  const { items } = await KyService.get(Endpoint.book.allbook).json<BookList>()
  console.log('items', items)
  return items
}

async function getBooktext(bookId: string) {
  const { data } = await KyService.get(
    `${Endpoint.book.booktext}/${bookId}`
  ).json<BookTextResponse>()
  return data
}

async function uploadWordImage(form: {
  save_local: boolean
  word_image_name: string
  word_id: number
  word_image_file: File
}) {
  const formData = new FormData()
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value as any)
  })
  // formData.append('my_test','my_test_value')
  const response = await KyService.post(Endpoint.word.uploadWordImagev2, {
    body: formData
    // searchParams: params
  })
  return response.status
}
async function updateWordIndex(languageId: number, firstWord: string) {
  await KyService.post(Endpoint.word.updateWordIndex, {
    searchParams: {
      language_id: languageId,
      first_word: firstWord
    }
  })
  // return response
}
async function getWordImages(wordString: string) {
  const response = await KyService.get(Endpoint.word.searchImage, {
    searchParams: {
      word_string: wordString
    }
  }).json<string[]>()
  return response
}
export default {
  getBooklist,
  getBooktext,
  uploadWordImage,
  updateWordIndex,
  getWordImages
}
