import type { WordToken } from '@/api/Interface'
import { wordImagePrefixUrl } from '@/api/apiEndpoint'

interface TextSelection {
  start_id: string
  end_id: string
  last_id: string
}

export const wordsSelection = reactive<TextSelection>({
  start_id: '',
  end_id: '',
  last_id: ''
})

export function resetWordsSelection() {
  wordsSelection.start_id = ''
  wordsSelection.end_id = ''
  wordsSelection.last_id = ''
}

// it is used to record the word when click or after mouse up
export const selectedWord = ref<WordToken | null>(null)
export const wordList = ref<{ word_id: string; word: WordToken }[]>([])

export const firstWordId = ref<string>('')

function getSmallWordId(wordId1: string, wordId2: string) {
  if (compareWordIds(wordId1, wordId2) <= 0) return wordId1
  return wordId2
}

export const mouseKeyDown = ref<boolean>(false)

export function updateWordsSelection() {
  const tempWordList = [...wordList.value]
  wordList.value = []
  // const startEl = document.getElementById(wordsSelection.start_id)
  // const endEl = document.getElementById(wordsSelection.end_id)
  if (tempWordList.length == 0) {
    return
  }
  tempWordList.sort((x, y) => compareWordIds(x.word_id, y.word_id))
  // console.log('tmp', tempWordList)

  const start_id = wordsSelection.start_id
  const end_id = getSmallWordId(wordsSelection.last_id, wordsSelection.end_id)
  // const last_id = lastSelectedWord.value
  const selectedWordList = tempWordList.filter((word) =>
    wordIdInRange(word.word_id, start_id, end_id)
  )
  if (selectedWordList.length == 0) {
    throw new Error('no words in range')
  } else if (selectedWordList.length == 1) {
    selectedWord.value = selectedWordList[0].word
  } else {
    let wordString = ''
    const wordTokens: string[] = []
    const wordPronunciation: string[] = []
    let wordLemma = ''
    let lastWord = selectedWordList[0].word

    for (const { word } of selectedWordList) {
      wordString += word.wordString
      wordTokens.push(...word.wordTokens)
      if (word.wordPronunciation !== '') wordPronunciation.push(word.wordPronunciation)

      wordLemma += word.wordLemma
      if (word.nextIsWs) {
        wordString += ' '
        wordLemma += ' '
      }
      lastWord = word
    }

    selectedWord.value = {
      wordString: wordString.trim(),
      wordPos: 'MULTI',
      wordLemma: wordLemma.trim(),
      wordPronunciation: wordPronunciation.join('・'),
      isMultipleWords: true,
      wordStatus: 1,
      wordImageSrc: null,
      wordTokens: wordTokens,
      nextIsWs: lastWord.nextIsWs
    } as WordToken
  }
}

export function wordSelectEnd() {
  if (mouseKeyDown.value) {
    mouseKeyDown.value = false
    updateWordsSelection()
  }
}

export function compareWordIds(wordId1: string, wordId2: string): number {
  const w1 = wordId1.replace('para', '').replace('sent', '')
  const w2 = wordId2.replace('para', '').replace('sent', '')
  const w1Arr = w1.split('_').map(Number)
  const w2Arr = w2.split('_').map(Number)

  for (let i = 0; i < w1.length; i++) {
    if (w1Arr[i] == w2Arr[i]) {
      continue
    }
    return w1Arr[i] > w2Arr[i] ? 1 : -1
  }
  return 0
}

export function wordIdInRange(curr_word_id: string, start_id: string, end_id: string): boolean {
  return compareWordIds(curr_word_id, start_id) >= 0 && compareWordIds(curr_word_id, end_id) <= 0
}
