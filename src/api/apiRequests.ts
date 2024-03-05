import { Endpoint } from '@/api/apiEndpoint'
import KyService from '@/api/config'
import type { BookList, BookTextResponse } from '@/api/Interface'

export async function getBooklist() {
  const { items } = await KyService.get(Endpoint.book.allbook).json<BookList>()
  return items
}
export async function getBooktext(bookId: string) {
  const { data } = await KyService.get(
    `${Endpoint.book.booktext}/${bookId}`
  ).json<BookTextResponse>()
  return data
}
