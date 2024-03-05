export type TSegment = ParsedTextSegment | TextParagraphSegment

export interface WordToken {
  wordString: string
  wordLemma: string
  wordPos?: string
  isMultipleWords: boolean
  isWord: boolean
  isEos: boolean
  nextIsWs: boolean
  wordStatus: number
  wordExplanation?: string
  wordPronunciation?: string
  wordTokens: string[]
  wordDbId: number
}

export interface ParsedTextSegment {
  // If the segmentType==='sentence', this will be an array of WordToken
  segmentWords: WordToken[]
  segmentValue: string
  segmentRaw: string
  segmentType: string
  paragraphOrder: number
  sentenceOrder: number
}

export interface TextParagraphSegment {
  segmentWords: ParsedTextSegment[]
  segmentValue: string
  segmentType: string
  segmentRaw: string
  paragraphOrder: number
}

interface BookText {
  title: string,
  id: number
}

export interface BookItem {
  id: number
  bookName: string
  language: Language
  texts: BookText[]
}
export interface BookList {
  items: BookItem[]
}
interface Language {
  languageName: 'English' | 'Japanese'
  parserName: 'english' | 'japanese'
  RTL: boolean
  id: number
}

export interface BookTextResponse {
  data: ParsedTextSegment[]
}
