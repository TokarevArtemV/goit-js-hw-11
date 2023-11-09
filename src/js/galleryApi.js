import axios from 'axios';
import { errorFn } from './notifycation';

export class GetImage {
  static #API_KEY = '40453839-bf63bb7ffb05993fc166c6375';

  constructor() {
    this.query = '';
    this.page = 1;
    this.totalPages = 1;
    this.perPage = 40;
    this.baseUrl = 'https://pixabay.com';
    this.endPoint = '/api/';
  }

  async getImages() {
    const PARAMS = new URLSearchParams({
      key: GetImage.#API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.perPage,
    });
    const url = this.baseUrl + this.endPoint + '?' + PARAMS;

    try {
      const response = await axios.get(url);
      if (response.status === 200 && response.hits !== []) return response;
      return Promise.reject(response.status);
    } catch (error) {
      errorFn(error.message);
    }
  }
}
