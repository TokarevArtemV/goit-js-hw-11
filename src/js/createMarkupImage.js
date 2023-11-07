export function createMarkupImage(arrImages) {
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