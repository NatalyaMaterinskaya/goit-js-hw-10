import SlimSelect from 'slim-select';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_4QuSjKBiaEG45SSSXJSrs2aegzVFfSjFobCFGnBSkg4k3kXAEVBWiuAHpau8nkOB';



function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';

  return fetch(`${BASE_URL}/breeds`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

fetchBreeds()
  .then(data => console.log(createMarkup(data)))
  .catch(err => console.log(err));

function createMarkup(arr) {
  return arr
    .map(
      ({ id, name }) =>
        `<option class="select breed-select" value="${id}">
       ${name}
      </option>`
    )
    .join('');
  }