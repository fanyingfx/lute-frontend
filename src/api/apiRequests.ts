import { Endpoint } from '@/api/apiEndpoint'
import KyService from '@/api/config'
import type { BookList, BookTextResponse, WordToken } from '@/api/Interface'

async function getBooklist() {
  const { items } = await KyService.get(Endpoint.book.allbook).json<BookList>()
  console.log('items', items)
  return items
}

async function getBooktextById(bookId: string) {
  const { data } = await KyService.get(
    `${Endpoint.book.booktext}/${bookId}`
  ).json<BookTextResponse>()
  return data
}
async function getBooktextTest(language: string) {
  const url = language === 'en' ? Endpoint.book.test_en : Endpoint.book.test_jp
  const { data } = await KyService.get(url).json<BookTextResponse>()
  return data
}

async function updateBooktextPagenum(booktextId: number, currentPageNumber: number) {
  const response = await KyService.post(Endpoint.book.update_booktext_pagenum, {
    searchParams: { booktext_id: booktextId, current_page_number: currentPageNumber }
  }).json()
  return response
}

async function deleteWord(wordId: number) {
  await KyService.delete(`${Endpoint.word.delete}/${wordId}`)
  // return response
}

async function uploadWordImage(form: {
  save_local: boolean
  word_image_name: string
  word_id: number
  file: File
}) {
  const formData = new FormData()
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value as any)
  })
  // formData.append('my_test','my_test_value')
  const response = await KyService.post(Endpoint.word.uploadWordImage, {
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

async function createOrUpdateWord(req: any) {
  const response = await KyService.post(Endpoint.word.createOrUpdate, {
    json: req
  }).json<WordToken>()
  return response
}

export default {
  getBooklist,
  getBooktextById,
  uploadWordImage,
  updateWordIndex,
  getWordImages,
  updateBooktextPagenum,
  deleteWord,
  createOrUpdateWord,
  getBooktextTest
}
