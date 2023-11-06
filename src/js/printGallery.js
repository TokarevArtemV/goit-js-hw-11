import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function printGallery({ hits }) {
  const markupImageBox = createMarkupImage(hits);

  refs.imgDivEl.innerHTML = '';
  refs.imgDivEl.insertAdjacentHTML('beforeend', markupImageBox);

  const lightbox = new SimpleLightbox('.gallery__link', {
    captionDelay: 250,
  });
}

function createMarkupImage(arrImages) {
  return arrImages
    .map(
      ({
        downloads,
        likes,
        views,
        comments,
        previewURL,
        largeImageURL,
        user,
      }) => {
        return `
  <div class="photo-card">
      <a class="gallery__link" href="${largeImageURL}">
        <img
            src="${previewURL}"
            alt="${user}"
            loading="lazy"
        />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
}
