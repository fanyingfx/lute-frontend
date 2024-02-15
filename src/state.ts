// import {reactive,} from 'vue'
import type { ServerResponse, TSegment, WordToken } from '@/Interface'
import axios from 'axios'
import { Endpoint } from '@/api'
import { ref } from 'vue'
import { bookDatapaginate } from '@/utils/TextUtils'
export const wordState =ref<WordToken|null>(null)
export const wordsPerPage=ref(500)
export const bookPageData = ref<TSegment[][]>([[{
  'segment_type': 'softlinebreak',
  segment_value: '',
  segment_raw: '',
  segment_order: 0
}]])
export async function updateBookPageData () {
  const {data} = await axios.get<ServerResponse>(Endpoint.book.test_parser, { params: { booktext_id: 1 } })
  bookPageData.value=bookDatapaginate(data.data, wordsPerPage.value)
}

// export const currentBookData;