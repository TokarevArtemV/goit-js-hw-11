import { refs } from './refs';
import { notifyStr } from './notifycation';
const _ = require('lodash');

export function updateStatusObserver(page, totalPages, observer) {
  document.addEventListener('scroll', _.throttle(endPage, 1000));

  const isLastPage = page >= totalPages;

  if (isLastPage) {
    observer.unobserve(refs.buttonLoadMoreEl);
  }

  function endPage() {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,

      document.body.offsetHeight,
      document.documentElement.offsetHeight,

      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    if (Math.ceil(window.scrollY) >= scrollHeight - innerHeight && isLastPage)
      notifyStr("We're sorry, but you've reached the end of search results");
  }
}
