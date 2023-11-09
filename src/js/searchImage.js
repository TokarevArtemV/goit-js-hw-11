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
const observer = new IntersectionObserver(loadMoreImages, {
  rootMargin: '500px',
  threshold: 0,
});

export async function searchImage(evt) {
  evt.preventDefault();

  const query = evt.currentTarget.elements.searchQuery.value
    .replace(/ +/g, ' ')
    .trim();
  if (!query) return;
  loadOn();
  getImage.query = query;
  refs.imgDivEl.innerHTML = '';
  getImage.page = 1;

  try {
    const {
      data,
      data: { totalHits },
    } = await getImage.getImages();

    if (totalHits === 0) {
      notifyStr(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadOff();
      return;
    }

    printGallery(data);

    getImage.totalPages = Math.ceil(totalHits / getImage.perPage);
    observer.observe(refs.buttonLoadMoreEl);
    lightbox.refresh();
    loadOff();
    notifyStr(`Hooray! We found ${totalHits} images.`);
  } catch (error) {
    loadOff();
    errorFn;
  }
}

export async function loadMoreImages([{ isIntersecting }]) {
  if (!isIntersecting) return;
  getImage.page++;
  updateStatusObserver(getImage.page, getImage.totalPages, observer);
  loadOn();
  try {
    const { data } = await getImage.getImages();
    printGallery(data);
    lightbox.refresh();
    loadOff();
  } catch (error) {
    loadOff();
    errorFn(error.message);
  }
}
