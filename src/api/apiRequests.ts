import { Endpoint } from '@/api/apiEndpoint'
import KyService from '@/api/config'
import type { BookList, BookTextResponse } from '@/api/Interface'

export async function getBooklist() {
  const { items } = await KyService.get(Endpoint.book.allbook).json<BookList>()
  console.log('items', items)
  return items
}

export async function getBooktext(bookId: string) {
  const { data } = await KyService.get(
    `${Endpoint.book.booktext}/${bookId}`
  ).json<BookTextResponse>()
  return data
}

export async function uploadWordImage(
  file: File,
  params: { save_local: boolean; image_name: string; word_id: number }
) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await KyService.post(Endpoint.word.upload_word_image, {
    body: formData,
    searchParams: params
  })
  return response.status
}
