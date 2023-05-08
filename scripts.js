//imports from data.js
import { books,authors,genres } from "./data.js";



// let page = 1;
let range = books.length
 if (!books || !Array.isArray(books)) {
   throw new Error('Source required');
}
if (!range || range.length < 2) {
  throw new Error('Range must be an array with two numbers');
}

// Define colors for day and night modes
const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};
const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
}
  
//Create document fragment for previews
const fragment = document.createDocumentFragment()
  let startIndex = 0;
  let endIndex = 36;
  const extracted = books.slice(startIndex, endIndex)
  
  //Loop through the extracted previews and append them to the fragment
 for (let i = 0; i < extracted.length; i++) {
      const preview = document.createElement('dl')
      preview.className = 'preview'
      preview.dataset.id = books[i].id
      preview.dataset.title = books[i].title
      preview.dataset.image = books[i].image
      preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
      preview.dataset.description = books[i].description
      preview.dataset.genre = books[i].genres
      preview.innerHTML= /*html*/`
      <div>
      <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}<dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>`
      fragment.appendChild(preview)
  }
  const booklist1 = document.querySelector('[data-list-items]')
  booklist1.appendChild(fragment)
  



  // create a new option element for authors
const allauthorsOption = document.createElement('option')
allauthorsOption.value = 'any';
allauthorsOption.textContent = 'All authors'; // use textContent instead of innerText
const authorSelect = document.querySelector("[data-search-authors]");
authorSelect.appendChild(allauthorsOption); // add the new option element to the select
for (const authorId in authors) {
  const optionElement = document.createElement('option');
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorSelect.appendChild(optionElement);
}

//// create a new option element genre
const genreSelect = document.querySelector("[data-search-genres]");
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
genreSelect.appendChild(allGenresOption);
for (const [genreId, genreName] of Object.entries(genres)) {
  const optionElement = document.createElement('option');
  optionElement.value = genreId;
  optionElement.textContent = genreName;
  genreSelect.appendChild(optionElement)
}


  //change themes
  const settingOverlay = document.querySelector('[data-header-settings]')
  const themePopUp =document.querySelector('[data-settings-overlay]')
  settingOverlay.addEventListener('click', ()=>{
  themePopUp
  })
  const dataSettingsTheme = document.querySelector('[data-settings-theme]')
  const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
  saveButton.addEventListener('click', (event) =>{
      event.preventDefault()
    if (dataSettingsTheme.value === 'day') {
      document.querySelector('body').style.setProperty('--color-dark', day.dark)
      document.querySelector('body').style.setProperty('--color-light', day.light)
    }
    if (dataSettingsTheme.value === 'night') {
      document.querySelector('body').style.setProperty('--color-dark', night.dark)
      document.querySelector('body').style.setProperty('--color-light', night.light)
      
        }
saveButton.close()
  })
  //search button`

  //search button to close and open Search overlay
  const searchbutton = document.querySelector("[data-header-search]");
  searchbutton.addEventListener('click', (event) => {
   document.querySelector("[data-search-overlay]").style.display = "block";
  })
  const searchCancel = document.querySelector("[data-search-cancel]");
  searchCancel.addEventListener('click', (event) => {
   document.querySelector("[data-search-overlay]").style.display = "none";
  })
  // Search function to store more options to chose in genres and authors selects
  const authorFragment = document.createDocumentFragment();
  let element = document.createElement('option');
  element.value = 'any';
  element.innerText = 'All Authors';
  authorFragment.appendChild(element);
  for (let [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    const value = id;
    const text = name;
    element.value = value;
    element.innerText = text;
    authorFragment.appendChild(element);
  }
  document.querySelector('[data-search-authors]').appendChild(authorFragment);
  const genresFragment = document.createDocumentFragment();
  let element2 = document.createElement('option');
  element2.value = 'any';
  element2.innerText = 'All Genres';
  genresFragment.appendChild(element2);
  for (let [id, name] of Object.entries(genres)) {
    const element = document.createElement('option');
    const value = id;
    const text = name;
    element.value = value;
    element.innerText = text;
    genresFragment.appendChild(element);
  }
  document.querySelector('[data-search-genres]').appendChild(genresFragment);

/// Show more button
const showMoreButton = document.querySelector('[data-list-button]')

// Update the text of the "Show More" button to display how many more items will be displayed
const numItemsToShow = Math.min(books.length - endIndex,)
const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`
showMoreButton.innerHTML = showMoreButtonText
showMoreButton.addEventListener('click', () => {


//// Increase the start and end indexes by 36 to get the next batch of books to display
startIndex += 36;
endIndex += 36;

// Create new variables with the same values as the updated start and end indexes
const startIndex1 = startIndex
const endIndex1 = endIndex

// Use the slice method to extract a subset of the books array based on the updated start and end indexes
const extracted = books.slice(startIndex1, endIndex1)

// Loop through the extracted books and create a preview element for each one
for (const {author ,image, title, id , description, published} of extracted) {

// Create a preview element and set its class and dataset attributes
const preview = document.createElement('dl')
preview.className = 'preview'
preview.dataset.id = id
preview.dataset.title = title
preview.dataset.image = image
preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
preview.dataset.description = description

// Set the innerHTML of the preview element to display the book image, title, and author
preview.innerHTML= /*html*/`
<div>
<image class='preview__image' src="${image}" alt="book pic"}/>
</div>
<div class='preview__info'>
<dt class='preview__title'>${title}<dt>
<dt class='preview__author'> By ${authors[author]}</dt>
</div>`

// Append the preview element to the fragment
fragment.appendChild(preview)
}

// Get the book list element and append the fragment to it to display the new batch of books
const booklist1 = document.querySelector('[data-list-items]')
booklist1.appendChild(fragment)

    // Update the text of the "Show More" button to display how many more items will be displayed
const numItemsToShow = Math.min(books.length - endIndex,)
const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})`
showMoreButton.innerHTML= showMoreButtonText
})
//Cancel button
// const searchCancel = document.querySelector("[data-search-cancel]");
// searchCancel.addEventListener('click', (event) => {
//  document.querySelector("[data-search-overlay]").style.display = "none";
// })


//Settings button 
const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})


//Settings Cancel button
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})
  

//code to display book details
const detailsToggle = (event) => {
    const overlay1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
 const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')
    event.target.dataset.id ? overlay1.style.display = "block" : undefined;
    event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.image ? image1.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? imageblur.setAttribute ('src', event.target.dataset.image) : undefined;
};
const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})

//Define click to display book information

const bookclick = document.querySelector('[data-list-items]');
bookclick.addEventListener('click', detailsToggle);



// Mode Cancel button
const cancelModeBtn = document.querySelector('[data-settings-cancel]')
cancelModeBtn.addEventListener( "click", () =>{

  
})






























