import { refs } from './refs';
import { Notify } from 'notiflix';

export function loadOn() {
//   refs.loadEl.classList.remove('hidden');
//   refs.imgContainerEl.classList.add('hidden');
}

export function loadOff() {
//   refs.loadEl.classList.add('hidden');
//   refs.imgContainerEl.classList.remove('hidden');
}

export function errorFn(error) {
  Notify.failure(error + ' Please try to reload page later', options.notiflix);
}

const options = {
  notiflix: {
    timeout: 6000,
    width: '300px',
    position: 'center-center',
    fontSize: '13px',
  },
};
