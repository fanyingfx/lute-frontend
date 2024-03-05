<script setup lang="tsx">
import { getBooklist } from '@/api/apiRequests'
interface Book {
  languageName: string
  bookId: number
  bookName: string
}

const columns = [
  {
    title: 'Book Name',
    key: 'bookName',
    render(row: Book) {
      const bookPath = { path: `/reading/${row.bookId}` }
      return <router-link to={bookPath}>{row.bookName}</router-link>
    }
  },
  {
    title: 'Language',
    key: 'languageName'
  }
]
const data = ref<Book[]>([])

watchEffect(async () => {
  const booklist = await getBooklist()
  data.value = booklist.map((bookItem) => {
    return {
      bookName: bookItem.bookName,
      languageName: bookItem.language.languageName,
      bookId: bookItem.id,
      children: bookItem.texts.map((bookText) => {
        return {
          bookName: `${bookText.id}-${bookText.title}`,
          languageName: bookItem.language.languageName,
          bookId: bookText.id
        }
      })
    }
  })
  console.log(booklist)
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>

<style scoped></style>
