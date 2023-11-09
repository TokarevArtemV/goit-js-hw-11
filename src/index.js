import { refs } from './js/refs';
import { searchImage, loadMoreImages } from './js/searchImage';
import { loadOn } from './js/loadState';


refs.formEl.addEventListener('submit', searchImage);
refs.buttonLoadMoreEl.addEventListener('click', loadMoreImages);


