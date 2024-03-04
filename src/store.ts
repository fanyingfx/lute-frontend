// import {reactive,} from 'vue'
import type { ServerResponse, TSegment, WordToken } from '@/Interface'
import { Endpoint } from '@/api'
import { ref } from 'vue'
import { bookDatapaginate } from '@/utils/TextUtils'
import KyService from '@/api/config'

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

export async function updateBookPageData() {
  const { data } = await KyService.get(Endpoint.book.test_parser, {
    searchParams: { booktext_id: 1 }
  }).json<ServerResponse>()

  bookPageData.value = bookDatapaginate(data, wordsPerPage.value)
}
