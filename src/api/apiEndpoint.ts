// const url = "http://127.0.0.1:8000";
export const Endpoint = {
  book: {
    onebook: 'book/one',
    allbook: 'book/list',
    booktext: 'book/booktext'
  },
  word: {
    createOrUpdate: 'word/create_or_update',
    delete: 'word/delete',
    uploadWordImage: 'word/upload_word_image',
    updateWordIndex: 'word/update_word_index'
  }
}
export const wordImagePrefixUrl = '/api/word_images'
