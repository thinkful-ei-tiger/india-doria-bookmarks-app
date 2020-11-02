import $ from 'jquery'
import './styles/main.css'
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
  bookmarks.render()
}

$(main)
export default {
  main
}