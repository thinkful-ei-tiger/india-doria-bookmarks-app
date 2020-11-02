import $ from 'jquery'
//import './src/styles/main.css'
import api from './src/api.js'
import store from './src/store.js'
import bookmarks from './src/bookmarks.js'


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