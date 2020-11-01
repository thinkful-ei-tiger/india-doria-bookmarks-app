import $ from 'jquery'
import store from './store'
import api from './api'


function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => (o[name] = val));
  return JSON.stringify(o);
};


function renderError() {
  if (store.store.error) {
    let element = generateErrorElements(store.store.error);
    $('.js-error-container').html(element);
  }
};


function generateErrorElements(message) {
  return `<input type="button" name="cancel-err" id="cancel-err" value="x" class="button cancel-error" /> <span class="error">${message}</span> `;
};

function generateAddSelectOptions(rating) {
  let options = '';
  for (let i = 1; i <= 5; i++) {
    options += `<option value="${i}" ${rating === i ? 'selected' : ''}>`;
    for (let x = 0; x < i; x++) {
      options += '★';
    }
    options += `</option>`;
  }
  return options;
};


function generateAddForm(item) {
  let options = generateAddSelectOptions(item ? item.rating : '');

  let html = ` <h2>${item ? 'Edit bookmark' : 'Add new bookmark'}</h2>
  <div class="js-error-container error-container flex-column "> </div>
  <form class="js-form flex-column" data-item-id="${item ? item.id : ''}">
      <input type="url" name="url" id="url" required placeholder="http:sample.com"/ value="${
        item ? item.url : ''
      }" required>
      <div class="details flex-column">
          <input type="text" class="title" placeholder="Insert bookmark name" name="title" value="${
            item ? item.title : ''
          }"  required>
          <label for="rating">Rating</label>
          
          <select name="rating" id="rating">
          ${options}
          </select>
          <textarea name="desc" id="description" cols="30" rows="10">${
            item ? item.desc : ''
          } </textarea>
      
      </div>
      <div class=" form-buttons flex-row">
  
          <button type="button" class=" buttons" id="cancel"> Cancel</button>
          <button type="submit" id="create" class="buttons">Save</button> 
      </div>
  </form>`;
  return html;
};

function getStars(rating) {
  let stars = 0
  let offStar = 5 - rating
  for (let i = 0; i < rating; i++) {
    start += 1
  }
  for (let i = 0; i < offStar; i++) {
    start -= 1
  }

  return stars;
};


function generateListItem(items) {
  let listString = '';
  items.forEach((site) => {
    let stars = '';
    if (site.rating) {
      stars = getStarts(site.rating);
    }

    listString += ` <li class='js-list-item list-item flex-column' tabindex="0" data-item-id="${
      site.id
    }">
                    <div class="list-head flex-row">
                        <span class="item-title"> ${site.title}</span> 
                        <span class="stars icon ${
                          !site.expanded ? '' : 'hidden'
                        }"> ${starts} </span>
                      <span class="trash ${site.expanded ? '' : 'hidden'}">
                        <button type="button" name="delete-item" class='js-delete delete-button'><img src="${deleteIcon}" alt="delete"> </button>
                    </span>
                    </div>
                    <div class="js-expand item-preview flex-column  ${
                      site.expanded ? '' : 'hidden'
                    }">
                        <span class="flex-row top-description">
                            <button class="buttons visit-button"><a href="${
                              site.url
                            }" alt="link-to bookmark" target= "black">Visit page</a></button>
                            <span class= "star flex-column" > ${
                              site.rating
                            } </span>
                        </span>
                        <p class="description">${site.desc}
                        </p>
                         <input type="button" class="js-edit buttons edit" value="Edit">
                    </div>
                    </li> `
  })

  return listString
}


function generateListTemplate(items) {
  let template = `<div class="js-error-container error-container flex-row "> </div>
  <div class="buttons-container flex-row">
        <button type="button" class="js-new buttons" id='new-bookmark'> + New bookmark</button>
        <select name="filter" id="filter" class='buttons'>
            <option value="" selected disabled >Filter By</option>
            <option value="0">No filter</option>
            <option value="1">+1 Star</option>
            <option value="2">+2 Star</option>
            <option value="3">+3 Star</option>
            <option value="4">+4 Star</option>
            <option value="5">+5 Star</option>
          </select>
    </div>
    <div class="result-list">
        <ul class="flex-column"> 
      `
  template += generateListItem(items)
  return template
}


function render() {
  const newStore = store.store
  let items = newStore.bookmarks
  let template = ''

  if (newStore.edit) {
    let item = newStore.bookmarks.find((item) => item.id === newStore.edit)
    template += generateAddForm(item)
  } else if (newStore.adding) {
    template += generateAddForm()
  } else if (newStore.filter === 0) {
    
    template += generateListTemplate(items)
  } else if (newStore.filter !== 0) {
    
    items = filterByRating(items, newStore.filter)
    template += generateListTemplate(items)
  }

  $('.container').html(template)
}

  function filterByRating(items, rating) {
  let filteredItems = items.filter((item) => item.rating >= rating)
  return filteredItems
  }

  function handleFormSubmit() {
  $('.container').on('submit', '.js-form', function (evt) {
    evt.preventDefault()
    let id = $(this).data('item-id')
    let vals = serializeJson(this)
    if (id) handleUpdateBookmark(id, vals)
    else handleNewBookmark(vals)
  })
}

function handleNewBookmark (bookmark) {
  api.addBookmark(bookmark)
    .then((item) => {
      console.log(item)
      store.addBookmark(item)
      store.toggleAdding()
      render()
    })
    .catch((error) => {
      store.setError(error.message)
      renderError()
    })
}

function handleUpdateBookmark(id, bookmark) {
  api.updateBookmark(id, bookmark)
    .then(() => {
      store.updateBookmark(id, bookmark)
      store.changeEdit('')
      render()
    })
    .catch((error) => {
      console.log(error)
      store.setError(error.message)
      renderError()
    })
}


function handleDeleteItem() {
  $('.container').on('click', '.js-delete', function (evt) {
    let id = $(this).closest('.js-list-item').data('item-id')
    api
      .deleteBookmark(id)
      .then(() => {
        store.deleteBookmark(id)
        render()
      })
      .catch((error) => {
        store.setError(error.message)
        renderError()
      })
  })
}



function handleCancelError() {
  $('.container').on('click', '#cancel-err', function () {
    store.setError(null)
    render()
  })
}
 function handleCancelClick() {
  $('.container').on('click', '#cancel', function (evt) {
    let id = $(this).closest('.js-form').data('item-id')
    if (id) store.changeEdit('')
    else store.toggleAdding()
    render()
  })
}

function handleFilterClick() {
  $('.container').on('change', '#filter', function (evt) {
    let filter = $(this).val()
    if (filter !== 0) {
      store.changeFilter(filter)
      render()
    }
  })
}

function handleClickNew() {
  $('.container').on('click', '.js-new', function (evt) {
    store.toggleAdding()
    render()
  })
}

function handlekeyDownListItem() {
  $('.container').on('keydown', '.js-list-item', function (evt) {
    if (evt.which == 13) {
      $(this).click()
    }
  })
}

function handleListItemClick () {
  $('.container').on('click', '.js-list-item', function (evt) {
    evt.stopPropagation()
    const id = $(this).data('item-id')
    store.toggleExpanded(id)
    render()
  })
}

function handleEditClick () {
  $('.container').on('click', '.js-edit', function (evt) {
    let id = $(this).closest('.js-list-item').data('item-id');
    store.changeEdit(id)
    render()
  })
}

function eventsListener() {
  handleFilterClick()
  handleListItemClick()
  handlekeyDownListItem()
  handleEditClick()
  handleCancelClick()
  handleFormSubmit()
  handleCancelError()
  handleClickNew()
  handleDeleteItem()
}

export default {
  render,
  eventsListener
}