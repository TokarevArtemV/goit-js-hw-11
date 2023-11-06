import { refs } from './js/refs';
import { fetchGalleryImages } from './js/galleryApi';
import { printGallery } from './js/printGallery';


refs.formEl.addEventListener('submit', searchImage);

function searchImage(evt) {
  evt.preventDefault();
  const query = evt.currentTarget.elements.searchQuery.value;

  fetchGalleryImages(query).then(({ data }) => {
    printGallery(data);
  });

  
}
