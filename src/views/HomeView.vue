<script setup lang="tsx">
import api from '@/api/apiRequests'

interface Book {
  languageName: string
  bookId: number
  bookName: string
  index: number
  languageId: number
  hasLink: boolean
  currentPage?: number
}

const columns = [
  {
    title: 'Book Name',
    key: 'bookName',
    render(row: Book) {
      if (row.hasLink) {
        const bookPath = {
          name: 'reading',
          params: { bookId: row.bookId },
          query: { languageId: row.languageId, currentPage: row.currentPage }
        }
        return <router-link to={bookPath}>{row.bookName}</router-link>
      }
      return <span>{row.bookName}</span>
    }
  },
  {
    title: 'Language',
    key: 'languageName'
  }
]
const data = ref<Book[]>([])

watchEffect(async () => {
  const booklist = await api.getBooklist()
  let i = 1
  data.value = booklist.map((bookItem) => {
    return {
      bookName: bookItem.bookName,
      languageName: bookItem.language.languageName,
      bookId: bookItem.id,
      languageId: bookItem.language.id,
      index: i++,
      hasLink: false,
      children: bookItem.texts.map((bookText) => {
        return {
          bookName: `${bookText.id}-${bookText.title}`,
          languageName: bookItem.language.languageName,
          bookId: bookText.id,
          languageId: bookItem.language.id,
          index: i++,
          hasLink: true,
          currentPage: bookText.currentPage
        }
      })
    }
  })
})
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item id="home">Home</n-breadcrumb-item>
  </n-breadcrumb>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-key="(row: Book) => row.index"
    :bordered="false"
    default-expand-all
  />
</template>

<style scoped></style>
