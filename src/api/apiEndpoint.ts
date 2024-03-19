// const url = "http://127.0.0.1:8000";
export const Endpoint = {
  book: {
    onebook: 'book/one',
    allbook: 'book/list',
    booktext: 'book/booktext',
    update_booktext_pagenum: 'book/booktext/update_page',
    test_en: 'book/booktext/test_en',
    test_jp: 'book/booktext/test_jp'
  },
  word: {
    createOrUpdate: 'word/create_or_update',
    delete: 'word/delete',
    updateWordIndex: 'word/update_word_index',
    uploadWordImage: 'word/upload_word_image',
    searchImage: 'word/search_word_image'
  }
}
export const wordImagePrefixUrl = '/api/word_images'
