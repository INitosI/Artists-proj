import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_CONFIG = {
  position: 'topRight',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  progressBar: true,
  animateInside: false,
};

const show = (type, title, message, options = {}) => {
  iziToast[type]({
    title,
    message,
    ...BASE_CONFIG,
    ...options,
  });
};

export const toast = {
  success: (message, options) => show('success', 'Success', message, options),

  error: (message, options) =>
    show('error', 'Error', message, {
      timeout: 5000,
      ...options,
    }),

  info: (message, options) => show('info', 'Info', message, options),
};
