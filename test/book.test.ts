import { describe, it, expect } from 'vitest'
import { bookDatapaginate } from '../src/utils/TextUtils'
import response  from './bookdata.json'
import { TSegment } from '../src/api/Interface'

describe('bookDatapaginate', () => {
  const bookData: TSegment[] = response.data

  it('bookDatapaginate should be work', () => {
    // console.log(bookDatapaginate(bookData,10))
    expect(bookDatapaginate(bookData, 5)).toHaveLength(2)

  })

})