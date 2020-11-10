import bookmark from './bookmarks.js'

const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0,
  edit: ''
}

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

function changeBookmark(id) {
  this.store.edit = id
}

function updateBookmark(id, params) {
  let foundBookmark = findById(id)
  params = JSON.parse(params)
  params.expanded = false
  Object.assign(foundBookmark, params)
}

function filterBookmarks(filter) {
  this.store.filter = filter
}

function toggleExpandedView(id) {
  let found = findById(id)
  found.expanded = !found.expanded
  console.log(found)
}

function toggleAdd() {
  this.store.adding = !this.store.adding
}

function displayError(message) {
  this.store.error = message
}




export default {
  store,
  findById,
  addBookmark,
  deleteBookmark,
  updateBookmark,
  changeBookmark,
  toggleAdd,
filterBookmarks,
displayError,
toggleExpandedView
}