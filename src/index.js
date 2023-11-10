import { refs } from './js/refs';
import { printImage, loadMoreImages } from './js/searchImage';


refs.formEl.addEventListener('submit', printImage);
refs.buttonLoadMoreEl.addEventListener('click', loadMoreImages);


