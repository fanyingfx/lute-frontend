// import {reactive,} from 'vue'
import type { ServerResponse, TSegment, WordToken } from '@/Interface'
import { Endpoint } from '@/api'
import { ref } from 'vue'
import { bookDatapaginate, compareWordIds, wordIdInRange } from '@/utils/TextUtils'
import { KyService } from '@/api/config'

export const wordState = ref<WordToken | null>(null)
export const wordList = ref<{ word_id: string; word: WordToken }[]>([])
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

export function updateWordsSelection() {
  console.log('wordlist', wordList.value)
  const tempWordList = [...wordList.value]
  wordList.value = []
  // const startEl = document.getElementById(wordsSelection.start_id)
  // const endEl = document.getElementById(wordsSelection.end_id)
  if (tempWordList.length == 0) {
    return
  }
  tempWordList.sort((x, y) => compareWordIds(x.word_id, y.word_id))
  console.log('tmp', tempWordList)

  const start_id = wordsSelection.start_id
  const end_id = wordsSelection.end_id
  tempWordList.filter((word) => wordIdInRange(word.word_id, start_id, end_id))
  if (tempWordList.length == 0) {
    throw new Error('no words in range')
  } else if (tempWordList.length == 1) {
    wordState.value = tempWordList[0].word
  } else {
    let wordString = ''
    const wordTokens: string[] = []
    let wordLemma = ''
    let lastWord = tempWordList[0].word

    for (const { word } of tempWordList) {
      wordString += word.wordString
      wordTokens.push(...word.wordTokens)
      console.log(word.wordString, word.nextIsWs)

      wordLemma += word.wordLemma
      if (word.nextIsWs) {
        wordString += ' '
        wordLemma += ' '
      }
      lastWord = word
    }

    wordState.value = {
      wordString: wordString.trim(),
      wordPos: 'MULTI',
      wordLemma: wordLemma.trim(),
      isMultipleWords: true,
      wordStatus: 1,
      wordTokens: wordTokens,
      nextIsWs: lastWord.nextIsWs
    } as WordToken
  }
}

window.addEventListener('mouseup', () => {
  if (mouseKeyDown.value) {
    mouseKeyDown.value = false
    console.log({ start_id: wordsSelection.start_id, end_id: wordsSelection.end_id })
    updateWordsSelection()
    wordsSelection.start_id = ''
    wordsSelection.end_id = ''
  }
})

export const mouseKeyDown = ref<boolean>(false)

export async function updateBookPageData() {
  const { data } = await KyService.get(Endpoint.book.test_parser, {
    searchParams: { booktext_id: 1 }
  }).json<ServerResponse>()

  bookPageData.value = bookDatapaginate(data, wordsPerPage.value)
}
