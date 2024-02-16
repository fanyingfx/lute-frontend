import type { SentenceSegment, TextParagraphSegment, TSegment } from '@/Interface'

function combineSentenceToParagraph(segments: TSegment[]): TSegment[] {
  const segmentArray = [] as TSegment[]
  let curr_paragraph_order: number = 1
  let textParagraphSegment = {
    segment_type: 'textparagraph',
    segment_value: [] as SentenceSegment[],
    paragraph_order: 1
  } as TextParagraphSegment
  let i = 0
  while (i < segments.length) {
    let segment = segments[i]
    while (i < segments.length && segment.segment_type === 'sentence') {
      if (segment.paragraph_order !== curr_paragraph_order) {
        if (textParagraphSegment.segment_value.length > 0) {
          segmentArray.push(textParagraphSegment)
        }
        textParagraphSegment = {
          segment_type: 'textparagraph',
          segment_value: [] as SentenceSegment[],
          paragraph_order: segment.paragraph_order
        } as TextParagraphSegment
        curr_paragraph_order = segment.paragraph_order
      }
      textParagraphSegment.segment_value.push(<SentenceSegment>segment)
      i++
      segment = segments[i]
    }
    if (textParagraphSegment.segment_value.length > 0) {
      segmentArray.push(structuredClone(textParagraphSegment))
    }
    if (segment !== undefined) {
      segmentArray.push(segment)
    }
    textParagraphSegment.segment_value = []
    i++
  }
  return segmentArray
}

export function bookDatapaginate(bookData: TSegment[], wordsPerPage: number): TSegment[][] {
  const tempAllData = [] as TSegment[][]
  let pageData = [] as TSegment[]
  let pageDataHasText = false
  let pageSegmentsCount = 0
  let currentSegmentLength = 0
  let index = 0

  while (index < bookData.length) {
    const segment = bookData[index]

    if (segment.segment_type === 'sentence') {
      currentSegmentLength = pageSegmentsCount + segment.segment_raw.length
    }

    if (currentSegmentLength < wordsPerPage || !pageDataHasText) {
      pageData.push(segment)
      index++
      // bookData.splice(1)
      if (segment.segment_type === 'sentence') {
        pageDataHasText = true
      }
      pageSegmentsCount = currentSegmentLength
    } else {
      while (pageData.length > 0 && pageData[0].segment_type.includes('linebreak')) {
        pageData = pageData.splice(1)
      }
      // console.log('pagedata-before', pageData)
      const newPageData = combineSentenceToParagraph(pageData)
      // console.log('pagedata-after', pageData)
      tempAllData.push(newPageData)
      pageDataHasText = false
      pageSegmentsCount = 0
      currentSegmentLength = 0
      pageData = []
    }
  }
  return tempAllData
}
