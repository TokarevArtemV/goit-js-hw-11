import axios from 'axios';
import { loadOn, errorFn } from './loadState';

// axios.defaults.headers.common['key'] = '40453839-bf63bb7ffb05993fc166c6375';

export function fetchGalleryImages(query) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const PARAMS = new URLSearchParams({
    key: '40453839-bf63bb7ffb05993fc166c6375',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  });
  const url = BASE_URL + END_POINT + '?' + PARAMS;
  
  return axios
    .get(url)
    .then(response => {
      if (response.status === 200) return response;
      return Promise.reject(response.status);
    })
    .catch(error => {
      errorFn(error);
    })
  .finally(loadOn());
}

// export function fetchCatByBreed(breedId) {
//   const BASE_URL = 'https://api.thecatapi.com/v1';
//   const END_POINT = '/images/search';
//   const PARAMS = new URLSearchParams({ breed_ids: breedId });
//   const url = `${BASE_URL}${END_POINT}?${PARAMS}`;
//   return axios
//     .get(url)
//     .then(response => {
//       if (response.status === 200) return response;
//       return Promise.reject(response.status);
//     })
//     .catch(error => {
//       errorFn(error);
//     })
//     .finally(loadOn());
// }
