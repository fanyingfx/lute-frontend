import type { ParsedTextSegment, TextParagraphSegment, TSegment } from '@/Interface'

function combineSentenceToParagraph(segments: ParsedTextSegment[]): TSegment[] {
  const segmentArray = [] as TSegment[]
  let currParagraphOrder: number = 1
  let textParagraphSegment = {
    segmentType: 'textparagraph',
    segmentRaw: '',
    segmentWords: [] as ParsedTextSegment[],
    paragraphOrder: 1
  } as TextParagraphSegment
  let i = 0
  // TODO using Queue to rewrite the Code
  while (i < segments.length) {
    let segment = segments[i]
    while (i < segments.length && segment.segmentType === 'sentence') {
      if (segment.paragraphOrder !== currParagraphOrder) {
        if (textParagraphSegment.segmentWords.length > 0) {
          segmentArray.push(textParagraphSegment)
        }
        textParagraphSegment = {
          segmentType: 'textparagraph',
          segmentWords: [] as ParsedTextSegment[],
          paragraphOrder: segment.paragraphOrder
        } as TextParagraphSegment
        currParagraphOrder = segment.paragraphOrder
      }
      textParagraphSegment.segmentWords.push(<ParsedTextSegment>segment)
      i++
      segment = segments[i]
    }
    if (textParagraphSegment.segmentWords.length > 0) {
      segmentArray.push(structuredClone(textParagraphSegment))
    }
    if (segment !== undefined) {
      segmentArray.push(segment)
    }
    textParagraphSegment.segmentWords = []
    i++
  }
  return segmentArray
}

export function bookDatapaginate(
  bookData: ParsedTextSegment[],
  wordsPerPage: number
): TSegment[][] {
  /**
   * @remarks
   * This TypeScript function takes an array of ParsedTextSegment,
   * and a number representing words per page,
   *  and paginates the book data by breaking it down into pages based on the words per page.
   * It uses a while loop to iterate through the book data, adding segments to each page
   *  until the word limit is reached, and then combining the segments into paragraphs
   * and pushing them into the result array.
   * The function returns the paginated data as an array of arrays of TSegment.
   */
  function removeHeadEmptyLineBreaks() {
    while (pageData.length > 0 && pageData[0].segmentType.includes('linebreak')) {
      pageData = pageData.splice(1)
    }
  }

  const tempAllData = [] as TSegment[][]
  let pageData = [] as ParsedTextSegment[]
  let pageDataHasText = false
  let pageSegmentsCount = 0
  let currentSegmentLength = 0
  let index = 0

  while (index < bookData.length) {
    const segment = bookData[index]

    if (segment.segmentType === 'sentence') {
      currentSegmentLength = pageSegmentsCount + segment.segmentWords.length
    }

    if (currentSegmentLength < wordsPerPage || !pageDataHasText) {
      pageData.push(segment)
      index++
      if (segment.segmentType === 'sentence') {
        pageDataHasText = true
      }
      pageSegmentsCount = currentSegmentLength
      // add sentence to pageData until the page token size is greater than wordsPerPage
      continue
    }
    removeHeadEmptyLineBreaks()
    // console.log('pagedata-before', pageData)
    const newPageData = combineSentenceToParagraph(pageData)
    // console.log('pagedata-after', pageData)
    tempAllData.push(newPageData)
    pageDataHasText = false
    pageSegmentsCount = 0
    currentSegmentLength = 0
    pageData = []
  }
  while (pageData.length > 0 && pageData[0].segmentType.includes('linebreak')) {
    pageData = pageData.splice(1)
  }
  if (pageData.length > 0) {
    tempAllData.push(combineSentenceToParagraph(pageData))
  }

  return tempAllData
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
    if (w1Arr[i] > w2Arr[i]) {
      return 1
    } else {
      return -1
    }
  }
  return 0
}

export function wordIdInRange(curr_word_id: string, start_id: string, end_id: string): boolean {
  return compareWordIds(curr_word_id, start_id) >= 0 && compareWordIds(curr_word_id, end_id) <= 0
}
