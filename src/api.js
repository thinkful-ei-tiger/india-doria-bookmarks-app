import $ from 'jquery'


const url = 'https://thinkful-list-api.herokuapp.com/india/bookmarks'

function addBookmark(bookmarksList) {
  return displayResults(`${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bookmarksList
  })
  
}

function displayResults(...arg) {
let error
return fetch(...arg).then((res) => {
  if (!res.ok) {
    error = {code: res.status}

    if (!res.headers.get("content-type").includes("json")) {
      error.message = res.statusText
      return Promise.reject(error)
    }
  }
  return res.json()
})
.then((data) => {
  if (error) {
    error.message = data.message
    return Promise.reject(e)
  }
  return data
})
}

function getBookmarks(){
return displayResults(url)
}

const updateBookmark = function (id, bookmarksList) {
  return displayResults(`${url}/${id}`, {
    method: 'PATCH',
    headers: {'Content-type': 'application/json'},
    body: bookmarksList
  })
}

const deleteBookmark = function (id) {
  return displayResults(`${url}/${id}`, { method: 'DELETE' });
}

export default {
addBookmark,
getBookmarks, 
updateBookmark,
deleteBookmark
}