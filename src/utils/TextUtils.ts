import type { ParsedTextSegment, TextParagraphSegment, TSegment } from '@/api/Interface'


/**
 * This function combines sentences into paragraphs based on their paragraph order.
 * It takes an array of ParsedTextSegment objects as input and returns an array of TSegment objects.
 *
 * @param {ParsedTextSegment[]} segments - The array of segments to be combined into paragraphs.
 * @returns {TSegment[]} - The array of combined segments.
 */
function combineSentenceToParagraph(segments: ParsedTextSegment[]): TSegment[] {
  const segmentArray = [] as TSegment[]
  let preSegment = { paragraphOrder: -1 } as TextParagraphSegment
  preSegment.segmentWords = [] as ParsedTextSegment[]
  for (const segment of segments) {
    if (segment.segmentType === 'sentence') {
      if (preSegment.paragraphOrder !== segment.paragraphOrder) {
        // new paragraph
        if (preSegment.segmentWords.length > 0) {
          segmentArray.push(preSegment)
        }
        preSegment = {
          segmentType: 'textparagraph',
          segmentRaw: '',
          segmentWords: [] as ParsedTextSegment[],
          paragraphOrder: segment.paragraphOrder
        } as TextParagraphSegment
        segmentArray.push(preSegment)
      }
      if (preSegment.paragraphOrder === segment.paragraphOrder) {
        preSegment.segmentWords.push(segment)
        continue
      }
    }
    segmentArray.push(segment)
    preSegment = {
      segmentType: 'textparagraph',
      segmentRaw: '',
      segmentWords: [] as ParsedTextSegment[],
      paragraphOrder: -1
    } as TextParagraphSegment
    // const newPageData = combineSentenceToParagraph(pageData)
    // tempAllData.push(pageData)
    // pageSegmentsCount = 0
    // pageData = []
  }
  return segmentArray
}

/**
 * This function paginates an array of ParsedTextSegment into pages based on the specified words per page.
 * It returns paginated data as an array of arrays of TSegment.
 *
 * @param {ParsedTextSegment[]} bookData - The array of segments to be paginated.
 * @param {number} wordsPerPage - The number of words per page.
 * @returns {TSegment[][]} - The paginated data.
 */
export function bookDatapaginate(
  bookData: ParsedTextSegment[],
  wordsPerPage: number
): TSegment[][] {

  const tempAllData = [] as TSegment[][]
  let pageData = [] as ParsedTextSegment[]
  let pageSegmentsCount = 0
  let index = 0

  while (index < bookData.length) {
    // const segment = bookData[index]
    // if the segment is a linebreak and the page is empty, skip it
    if (bookData[index].segmentType.includes('linebreak') && pageData.length === 0) {
      index++
      continue
    }
    if (
      bookData[index].segmentType === 'sentence'
    ) {
      if(pageSegmentsCount + bookData[index].segmentWords.length <= wordsPerPage){
        pageData.push(bookData[index])
        pageSegmentsCount += bookData[index].segmentWords.length
        index++
        continue
      }else {
        tempAllData.push(pageData)
        pageSegmentsCount = bookData[index].segmentWords.length
        pageData = [bookData[index]]
        continue
      }
    }
    if (bookData[index].segmentType === 'pagestart') {
      // const newPageData = combineSentenceToParagraph(pageData)
      tempAllData.push(pageData)
      pageSegmentsCount = 0
      pageData = []
      index++

      while (bookData[index].segmentType !== 'pageend') {
        pageData.push(bookData[index])
        index++
      }
      //skip pageend
      index++
      tempAllData.push(pageData)
      pageData = []
      pageSegmentsCount = 0
      continue
    }
    pageData.push(bookData[index])
    index++
  }
  if (pageData.length > 0) {
    tempAllData.push(pageData)
  }
  console.log('tempAllData', tempAllData)

  return tempAllData.map((data) => combineSentenceToParagraph(data as ParsedTextSegment[]))
}
