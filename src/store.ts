// import {reactive,} from 'vue'
import type { ParsedTextSegment, ServerResponse, TSegment, WordToken } from '@/Interface'
import { Endpoint } from '@/api'
import { ref } from 'vue'
import { bookDatapaginate, wordIdInRange } from '@/utils/TextUtils'
import Service from '@/api/config'

export const wordState = ref<WordToken | null>(null)
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
export const currentLanguageId = ref(1)

export function updateSelection() {
  const startEl = document.getElementById(wordsSelection.start_id)
  const endEl = document.getElementById(wordsSelection.end_id)
  const start_id = wordsSelection.start_id
  const end_id = wordsSelection.end_id

  if (startEl !== null && endEl !== null) {
    const range = document.createRange()
    range.setStart(startEl, 0)
    range.setEnd(endEl, 1)
    if (lastSelectedWord.value !== null) {
      const ancestorContainer = <HTMLElement>range.commonAncestorContainer
      const word_tokens = <string[]>Array.from(ancestorContainer.children)
        .filter((e) => {
          const ele = e as HTMLElement
          return wordIdInRange(ele.id, start_id, end_id) && ele.dataset['isWord'] === 'true'
        })
        .flatMap((e) => {
          const ele = e as HTMLElement
          const elementWordTokens = ele.dataset['wordTokens']
          if (elementWordTokens !== undefined && elementWordTokens.includes(',')) {
            return elementWordTokens.split(',')
          }
          return elementWordTokens
        })
      // TODO need a better way to handle the punctuation and wordtokens
      const puncts = <string[]>Array.from(ancestorContainer.children)
        .filter((e) => {
          const elem = e as HTMLElement
          return wordIdInRange(elem.id, start_id, end_id) && elem.dataset['isWord'] === 'false'
        })
        .map((e) => e.textContent)

      let new_word_string = range.toString()
      for (const punct of puncts) {
        new_word_string = new_word_string.replace(punct, '')
      }

      const multipleWord = {
        wordString: new_word_string,
        wordPos: 'MULTI',
        wordLemma: range.toString(),
        isMultipleWords: true,
        wordTokens: word_tokens,
        nextIsWs: lastSelectedWord.value.nextIsWs
      } as WordToken
      // multipleWord.word_string = range.toString()

      wordState.value = multipleWord
    }
  }
}
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
  // const dt = await Service.get('/book/list')
  // console.log('test service',dt)

  const { data } = await Service.get<ParsedTextSegment[]>(Endpoint.book.test_parser, {
    params: { booktext_id: 1 }
  })
  console.log('data', data)
  bookPageData.value = bookDatapaginate(data, wordsPerPage.value)
}

// export const currentBookData;
