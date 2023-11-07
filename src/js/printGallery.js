import { refs } from './refs';
import { createMarkupImage } from './createMarkupImage';

export function printGallery({ hits }) {
  const markupImageBox = createMarkupImage(hits);

  refs.imgDivEl.insertAdjacentHTML('beforeend', markupImageBox);
}
