import { errorFn, notifyStr } from './notifycation';
import { GetImage } from './galleryApi';
import { printGallery } from './printGallery';
import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const getImage = new GetImage();
const lightbox = new SimpleLightbox('.gallery__link', {
  captionDelay: 250,
});

export async function searchImage(evt) {
  evt.preventDefault();

  const query = evt.currentTarget.elements.searchQuery.value
    .replace(/ +/g, ' ')
    .trim();

  if (!query) return;
  getImage.query = query;

  try {
    const {
      data,
      data: { totalHits },
    } = await getImage.getImages();

    if (totalHits === 0) {
      notifyStr(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    
    notifyStr(`Hooray! We found ${totalHits} images.`);
    refs.imgDivEl.innerHTML = '';
    printGallery(data);
    getImage.page = 1;
    getImage.totalPages = Math.ceil(
      totalHits / getImage.perPage
    );
    observer.observe(refs.buttonLoadMoreEl);
    lightbox.refresh();
  } catch (error) {
    errorFn;
  }
}

const observer = new IntersectionObserver(loadMoreImages, {
  rootMargin: '500px',
  threshold: 0,
});

export async function loadMoreImages([{ isIntersecting }]) {
  if (!isIntersecting) return;
  getImage.page++;
  updateStatusObserver();

  try {
    const { data } = await getImage.getImages();
    printGallery(data);
    lightbox.refresh();
  } catch (error) {
    errorFn;
  }
}

function updateStatusObserver() {
  const isLastPage = getImage.page >= getImage.totalPages;
  if (isLastPage) {
    observer.unobserve(refs.buttonLoadMoreEl);
    notifyStr("We're sorry, but you've reached the end of search results");
  }
}
