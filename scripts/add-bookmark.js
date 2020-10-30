const store = {
    bookmarks: [ ],
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

function renderSaved() {
    for (let i=0; i<=store.bookmarks.length; i++) {
      $('.js-bookmark-list').html(
        `<li>${store.bookmarks[i].title}</li>`
        )
        console.log("damn girl")
    }
    
}

function saveBookmark() {
  let bookmarkObject = {
    id: 0,
      title: `${title.value}`,
      rating: `${rating.value}`,
      url: `${url.value}`,
      description: `${description.value}`,
      expanded: false
  }
  store.bookmarks.push(bookmarkObject)
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