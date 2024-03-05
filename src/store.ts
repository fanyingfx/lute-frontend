// import {reactive,} from 'vue'
import type { BookTextResponse, TSegment, WordToken } from '@/api/Interface'
import { Endpoint } from '@/api/apiEndpoint'
import { ref } from 'vue'
import { bookDatapaginate } from '@/utils/TextUtils'
import KyService from '@/api/config'
import { getBooktext } from '@/api/apiRequests'

export const wordsPerPage = ref(250)
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

export async function updateBookPageData(bookId: string = '1') {
  // const { data } = await KyService.get(Endpoint.book.booktext, {
  //   searchParams: { booktext_id: bookId }
  // }).json<BookTextResponse>()
  //
  const data = await getBooktext(bookId)
  bookPageData.value = bookDatapaginate(data, wordsPerPage.value)
}
