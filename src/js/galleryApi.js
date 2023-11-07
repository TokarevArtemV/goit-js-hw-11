import axios from 'axios';
import { loadOn } from './loadState';
import { errorFn } from './notifycation';
// axios.defaults.headers.common['key'] = '40453839-bf63bb7ffb05993fc166c6375';

export class ImageApi {
  static #API_KEY = '40453839-bf63bb7ffb05993fc166c6375';

  constructor() {
    this.query = '';
    this.page = 1;
    this.totalPages = 1;
    this.perPage = 40;
    this.baseUrl = 'https://pixabay.com';
    this.endPoint = '/api/';
  }

  getImages() {
    const PARAMS = new URLSearchParams({
      key: ImageApi.#API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.perPage,
    });
    const url = this.baseUrl + this.endPoint + '?' + PARAMS;

    return axios
      .get(url)
      .then(response => {
        if (response.status === 200) return response;
        return Promise.reject(response.status);
      })
      .catch(errorFn)
      .finally(loadOn());
  }
}
