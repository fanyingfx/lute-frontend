// import {reactive,} from 'vue'
import type { TSegment } from '@/api/Interface'
import { ref } from 'vue'
import { bookDatapaginate } from '@/utils/TextUtils'
import api from '@/api/apiRequests'
import { wordsPerPage } from '@/store/WordsSelectionStore'

export const bookPageData = ref<TSegment[][]>([
  [
    {
      segmentWords: [],
      segmentType: 'softlinebreak',
      segmentValue: '',
      segmentRaw: '',
      paragraphOrder: 0
    }
  ]
])
export const currentLanguageId = ref(1)
export async function getBookPageData(bookId: string = '1') {
  return bookDatapaginate(await api.getBooktext(bookId), wordsPerPage.value)
}
export async function getTestBookPageData(language: string = '1') {
  return bookDatapaginate(await api.getBooktextTest(language), wordsPerPage.value)
}
// export async function updateBookPageData(bookId: string = '1') {
//   let data = [] as ParsedTextSegment[]
//   if(isNaN(Number(bookId))){
//     // test data
//     data= await api.getBooktextTest(bookId)
//   }else{
//      data = await api.getBooktext(bookId)
//   }
//   console.log('bookData', data)
//   bookPageData.value = bookDatapaginate(data, wordsPerPage.value)
// }
