const store = {
    bookmarks: [ {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',       expanded: false
    }],
   adding: true,
    error: null,
    filter: 0
  };



function render() {
  //Sets the entire page to the add-bookmark user flow.
  $('.js-save-bookmark').html(
    ` <form action="submit" class="add-bookmark">
    <input type="text" id="title" placeholder="Title">
    <input type="link" id="url" placeholder="URL">
    <input type="text" id="description" placeholder="Description">
    <select name="rating" id="rating">
        <option value="">Rating</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
        <input type="submit" value="Save">
    </select>
</form> 
    `
  )
}



function saveBookmark() {
const bookmarkData = JSON.stringify({
    title: `${title.value}`,
    //rating: `${rating.value}`,
    url: `${url.value}`,
    description: `${description.value}`  
  });
  
  fetch('https://thinkful-list-api.herokuapp.com/india/bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bookmarkData
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err.message))
  //REQ BODY: {"title": `${title.value}`, "url": `${url.value}`, "desc": `${description.value}`, "rating": `${rating.value}` }
  //`<li>${title.value}, ${url.value}, ${description.value}, ${rating.value} </li>`
  //{
  //  id: 0,
    //  title: `${title.value}`,
      //rating: `${rating.value}`,
      //url: `${url.value}`,
      //description: `${description.value}`,
      //expanded: false
 // }`
  
  //store.bookmarks.push(bookmarkObject)
}

const handleAddBookmark = function () {
  $("button").click(function(event) {
    event.preventDefault()
  
    render()
   
  })
}

const handleSaveBookmark = function (bookmark) {
  //add the bookmark info based on user input to the store.
  $("body").on('submit', '.add-bookmark', function(event)
  {event.preventDefault()
   saveBookmark()
    console.log(store.bookmarks)
  renderSaved()
  })
  

}

$(
  handleAddBookmark(),
  handleSaveBookmark()
)