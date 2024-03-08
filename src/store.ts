// import {reactive,} from 'vue'
import type { TSegment } from '@/api/Interface'
import { ref } from 'vue'
import { bookDatapaginate } from '@/utils/TextUtils'
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
  const data = await getBooktext(bookId)
  bookPageData.value = bookDatapaginate(data, wordsPerPage.value)
}
