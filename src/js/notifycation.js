import { Notify } from 'notiflix';

export function errorFn(error) {
  console.log(error);
  Notify.failure(error + ' Please try to reload page later', options.notiflix);
}

const options = {
  notiflix: {
    timeout: 6000,
    width: '300px',
    fontSize: '13px',
  },
};

export function notifyStr(str){
  Notify.success(str, options.notiflix);
}