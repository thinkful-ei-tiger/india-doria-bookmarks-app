import jquery from '../node_modules/jquery/dist/jquery.js'
import bookmark from './bookmarks.js'
const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0,
  edit: ''
};

function findById(id) {
  return store.bookmarks.find((site) => site.id === id)
}

function addBookmark(site) {
site.expanded = false
this.store.bookmarks.push(site)
}

function deleteBookmark(id) {
this.store.bookmarks = this.store.bookmarks.filter((item) => item.id !== id)
}



export default {
  findById,
  addBookmark,
  deleteBookmark
}