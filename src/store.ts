// import {reactive,} from 'vue'
import type { ServerResponse, TSegment, WordToken } from '@/Interface'
import axios from 'axios'
import { Endpoint } from '@/api'
import { ref } from 'vue'
import { bookDatapaginate, compareWordIds } from '@/utils/TextUtils'

export const wordState = ref<WordToken | null>(null)
export const wordsPerPage = ref(500)
export const bookPageData = ref<TSegment[][]>([
  [
    {
      segment_type: 'softlinebreak',
      segment_value: '',
      segment_raw: '',
      paragraph_order: 0
    }
  ]
])

interface TextSelection {
  start_id: string,
  end_id: string
}

export const selectedWords = ref<string[]>([])
export const wordsSelection = reactive<TextSelection>({
  start_id: '',
  end_id: ''
})
export const firstWordId = ref<string>('')

export function updateSelection() {
  const startEl = document.getElementById(wordsSelection.start_id)
  const endEl = document.getElementById(wordsSelection.end_id)
  if (startEl !== null && endEl !== null) {
    const range = document.createRange()
    range.setStart(startEl, 0)
    range.setEnd(endEl, 1)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    console.log('str', sel?.toString())
  }


}

window.addEventListener('mouseup', () => {
  if (mouseKeyDown.value) {
    mouseKeyDown.value = false
    // console.log(wordsSelection)
    if (compareWordIds(wordsSelection.start_id, wordsSelection.end_id) > 0) {
      const temp_id = wordsSelection.start_id
      if (compareWordIds(wordsSelection.end_id, firstWordId.value) > 0) {
        wordsSelection.end_id = firstWordId.value
      }
      wordsSelection.start_id = wordsSelection.end_id
      wordsSelection.end_id = temp_id
    }
    console.log({ start_id: wordsSelection.start_id, end_id: wordsSelection.end_id })

    updateSelection()
    wordsSelection.start_id = ''
    wordsSelection.end_id = ''
  }
})

// export const lastSelectedWordId = ref<string>('')
export const mouseKeyDown = ref<boolean>(false)

export async function updateBookPageData() {
  const { data } = await axios.get<ServerResponse>(Endpoint.book.test_parser, {
    params: { booktext_id: 1 }
  })
  bookPageData.value = bookDatapaginate(data.data, wordsPerPage.value)
}

// export const currentBookData;
