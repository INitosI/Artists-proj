let loaderElement = null;
let hideTimeout = null;

const MIN_VISIBLE_TIME = 300;
let lastShowTime = 0;

const createLoader = () => {
  loaderElement = document.createElement('div');
  loaderElement.className = 'loader';
  loaderElement.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loaderElement);
};

export const showLoader = () => {
  if (!loaderElement) {
    createLoader();
  }
  lastShowTime = Date.now();
  loaderElement.classList.add('is-visible');

  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
};

export const hideLoader = () => {
  if (!loaderElement) return;

  const elapsed = Date.now() - lastShowTime;
  const delay = Math.max(0, MIN_VISIBLE_TIME - elapsed);

  if (hideTimeout) clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    if (loaderElement) {
      loaderElement.classList.remove('is-visible');
    }
    hideTimeout = null;
  }, delay);
};
