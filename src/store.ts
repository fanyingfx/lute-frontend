// import {reactive,} from 'vue'
import type { ServerResponse, TSegment, WordToken } from '@/Interface'
import axios from 'axios'
import { Endpoint } from '@/api'
import { ref } from 'vue'
import { bookDatapaginate, wordIdInRange } from '@/utils/TextUtils'

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
  start_id: string
  end_id: string
}

export const selectedWords = ref<string[]>([])
export const lastSelectedWord = ref<WordToken | null>(null)
export const wordsSelection = reactive<TextSelection>({
  start_id: '',
  end_id: ''
})
export const firstWordId = ref<string>('')

export function updateSelection() {
  const startEl = document.getElementById(wordsSelection.start_id)
  const endEl = document.getElementById(wordsSelection.end_id)
  const start_id = wordsSelection.start_id
  const end_id = wordsSelection.end_id

  if (startEl !== null && endEl !== null) {
    const range = document.createRange()
    range.setStart(startEl, 0)
    range.setEnd(endEl, 1)
    // const sel = window.getSelection()
    // console.log('rangestr', range?.toString())
    if (lastSelectedWord.value !== null) {
      const ancestorContainer = <HTMLElement>range.commonAncestorContainer
      const word_tokens = <string[]>Array.from(ancestorContainer.children)
        .filter((e) => {
          const ele = e as HTMLElement
          return wordIdInRange(ele.id, start_id, end_id) && ele.dataset['isWord'] === 'true'
        })
        .flatMap((e) => {
          const ele = e as HTMLElement
          const e_word_tokens = ele.dataset['wordTokens']
          if (e_word_tokens !== undefined && e_word_tokens.includes(',')) {
            return e_word_tokens.split(',')
          }
          return e_word_tokens
        })
      // TODO need a better way to handle the punctuation and wordtokens
      const puncts = <string[]> Array.from(ancestorContainer.children).filter((e) => {
        const ele = e as HTMLElement
        return wordIdInRange(ele.id, start_id, end_id) && ele.dataset['isWord'] === 'false'
      }).map(e=>e.textContent)


      let new_word_string= range.toString()
      for (const punct of puncts) {
        new_word_string=new_word_string.replace(punct,'')
      }

      const multipleWord = {
        word_string: new_word_string,
        word_pos: 'MULTI',
        word_lemma: range.toString(),
        is_multiple_words: true,
        word_tokens: word_tokens,
        next_is_ws: lastSelectedWord.value.next_is_ws
      } as WordToken
      // multipleWord.word_string = range.toString()

      wordState.value = multipleWord
    }
  }
}
console.log('add mouseup')
window.addEventListener('mouseup', () => {
  if (mouseKeyDown.value) {
    mouseKeyDown.value = false
    console.log({ start_id: wordsSelection.start_id, end_id: wordsSelection.end_id })

    updateSelection()
    wordsSelection.start_id = ''
    wordsSelection.end_id = ''
  }
})

export const mouseKeyDown = ref<boolean>(false)

export async function updateBookPageData() {
  const { data } = await axios.get<ServerResponse>(Endpoint.book.test_parser, {
    params: { booktext_id: 1 }
  })
  console.log('data', data)
  bookPageData.value = bookDatapaginate(data.data, wordsPerPage.value)
}

// export const currentBookData;
