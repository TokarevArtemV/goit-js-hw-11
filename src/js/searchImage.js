import { errorFn, notifyStr } from './notifycation';
import { GetImage } from './galleryApi';
import { printGallery } from './printGallery';
import { refs } from './refs';
import { updateStatusObserver } from './updateStatusObserver';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { loadOn, loadOff } from './loadState';

const getImage = new GetImage();
const lightbox = new SimpleLightbox('.gallery__link', {
  captionDelay: 250,
});
const observer = new IntersectionObserver(printMoreImages, {
  rootMargin: '500px',
  threshold: 0,
});

export async function printImage(evt) {
  evt.preventDefault();
  loadOn();
  try {
    const data = await getImage.searchImage(
      evt.currentTarget.elements.searchQuery.value
    );
    refs.imgDivEl.innerHTML = '';
    printGallery(data);
    observer.observe(refs.buttonLoadMoreEl);
    lightbox.refresh();
    loadOff();
    notifyStr(`Hooray! We found ${data.totalHits} images.`);
  } catch (error) {
    errorFn(error.message);
    loadOff();
  }
}

export async function printMoreImages([{ isIntersecting }]) {
  if (!isIntersecting) return;
  loadOn();
  try {
    const data = await getImage.loadMoreImages();
    printGallery(data);
    lightbox.refresh();
    loadOff();
    updateStatusObserver(getImage.page, getImage.totalPages, observer);
  } catch (error) {
    errorFn(error.message);
    loadOff();
  }
}
