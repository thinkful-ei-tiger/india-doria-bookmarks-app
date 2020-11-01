import $ from 'jquery'
import api from './api.js'
import store from './store.js'
import bookmarks from './bookmarks.js'


function main() {
  api.getBookmarks().then((sites) => {
    sites.forEach((bookmark) => {
      store.addBookmark(bookmark)
      bookmarks.render()
    })
  })
  bookmarks.eventsListener()
  booksmarks.render()
}

$(main)
export default {
  main
}