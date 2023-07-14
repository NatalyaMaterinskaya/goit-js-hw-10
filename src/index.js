import SlimSelect from 'slim-select';
import {
  fetchBreeds,
  createMarkup,
  createArr,
  fetchCatByBreed,
} from './cat-api';

let select = new SlimSelect({
  select: '.breed-select',
});

const containerEl = document.querySelector('.container');
const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');
const loaderEl = document.querySelector('.loader');

containerEl.classList.add('isHidden');;

fetchBreeds()
  .then(data => {
    select.setData(createMarkup(data));
  })
  .catch(err => {
    errorEl.classList.add('isVisible');
  })
  .finally(() => {
    loaderEl.classList.add('isHidden');
    containerEl.classList.remove('isHidden');
  });

function selectItem(event) {
  const breedId = event.currentTarget.value;
  loaderEl.classList.remove('isHidden');
  errorEl.classList.remove('isVisible');
  catInfoEl.classList.add('isHidden');
  fetchCatByBreed(breedId)
    .then(data => {
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
      errorEl.classList.add('isVisible');
    })
    .finally(() => {
      loaderEl.classList.add('isHidden');
      catInfoEl.classList.remove('isHidden');
    });
}
selectEl.addEventListener('change', selectItem);
