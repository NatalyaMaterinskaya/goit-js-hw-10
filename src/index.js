import SlimSelect from 'slim-select';
import {
  fetchBreeds,
  createMarkup,
  createArr,
  fetchCatByBreed,
} from './cat-api';

let select = new SlimSelect({
  select: '.breed-select',
  settings: {
    placeholderText: 'please select a cat breed',
  },
});

const containerEl = document.querySelector('.container');
const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');
const loaderEl = document.querySelector('.loader');

fetchBreeds()
  .then(data => {
    containerEl.style.display = 'block';
    select.setData(createMarkup(data));
  })
  .catch(err => {
    containerEl.style.display = 'none';
    errorEl.style.display = 'block';
  })
  .finally(() => (loaderEl.style.display = 'none'));

function selectItem(event) {
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      containerEl.style.display = 'block';
      console.log(data);
      const markup = data
        .map(
          ({ url, breeds: [{ name, description, temperament }] }) =>
            `<li class="cat-info-item">
            <img
              class="cat-info-image"
              src="${url}"
              width="400"
            />
            <div class="all-cat-description">
              <h2 class="name">${name}</h2>
              <p class="description">${description}</p>
              <p class="temperament"><span>Temperament: </span>${temperament}</p>
            </div>
        </li>`
        )
        .join('');

      catInfoEl.innerHTML = markup;
    })
    .catch(err => {
      containerEl.style.display = 'none';
      errorEl.style.display = 'block';
    })
    .finally(() => (loaderEl.style.display = 'none'));
}
selectEl.addEventListener('change', selectItem);
