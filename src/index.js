import { refs } from './js/refs';
import { searchImage, loadMoreImages } from './js/searchImage';

refs.formEl.addEventListener('submit', searchImage);
refs.buttonLoadMoreEl.addEventListener('click', loadMoreImages);


