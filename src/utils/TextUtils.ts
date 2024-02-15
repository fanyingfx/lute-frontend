import type { TextParagraphSegment, TSegment } from '@/Interface'

export function bookDatapaginate(bookData: TSegment[], wordsPerPage: number): TSegment[][] {
  const tempAllData = [] as TSegment[][]
  let pageData = [] as TSegment[]
  let pageDataHasText = false
  let pageSegmentsCount = 0
  let currentSegmentLength = 0


  for (const segment of bookData) {
    if (segment.segment_type === 'sentence') {
      currentSegmentLength = pageSegmentsCount + segment.segment_raw.length
    }

    if (currentSegmentLength < wordsPerPage || !pageDataHasText) {
      pageData.push(segment)
      if (segment.segment_type === 'sentence') {
        pageDataHasText = true
      }
      pageSegmentsCount = currentSegmentLength
    } else {
      while (pageData.length > 0 && pageData[0].segment_type.includes('linebreak') ) {
        pageData = pageData.splice(1)
      }

      tempAllData.push(pageData)
      pageSegmentsCount = 0
      currentSegmentLength = 0
      pageData = []
    }
  }
  // console.log(tempAllData)
  return tempAllData

}




