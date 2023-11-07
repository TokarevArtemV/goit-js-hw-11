import { errorFn, notifyStr } from './notifycation';
import { ImageApi } from './galleryApi';
import { printGallery } from './printGallery';
import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const getGalleryImages = new ImageApi();
const lightbox = new SimpleLightbox('.gallery__link', {
  captionDelay: 250,
});
const observer = new IntersectionObserver(loadMoreImages, {
  rootMargin: '500px',
  threshold: 0,
});

export function searchImage(evt) {
  evt.preventDefault();
  if (!evt.currentTarget.elements.searchQuery.value) return;

  getGalleryImages.query = evt.currentTarget.elements.searchQuery.value;
  getGalleryImages
    .getImages()
    .then(({ data, data: { totalHits } }) => {
      refs.imgDivEl.innerHTML = '';
      printGallery(data);
      getGalleryImages.page = 1;
      getGalleryImages.totalPages = Math.ceil(
        totalHits / getGalleryImages.perPage
      );
      observer.observe(refs.buttonLoadMoreEl);
      notifyStr(`Hurray, we found ${totalHits} images`);

      lightbox.refresh();
    })
    .catch(errorFn);
}

export function loadMoreImages([{ isIntersecting }]) {
  if (!isIntersecting) return;
  getGalleryImages.page++;
  updateStatusObserver();
  getGalleryImages
    .getImages()
    .then(({ data }) => {
      printGallery(data);
      lightbox.refresh();
    })
    .catch(errorFn);
}

function updateStatusObserver() {
  const isLastPage = getGalleryImages.page >= getGalleryImages.totalPages;
  if (isLastPage) {
    observer.unobserve(refs.buttonLoadMoreEl);
    notifyStr("We're sorry, but you've reached the end of search results");
  }
}
