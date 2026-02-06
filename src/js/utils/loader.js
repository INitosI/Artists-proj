let loaderElement = null;
let activeRequests = 0;
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
  activeRequests += 1;

  if (!loaderElement) {
    createLoader();
  }

  if (activeRequests === 1) {
    lastShowTime = Date.now();
    loaderElement.classList.add('is-visible');
  }

  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
};

export const hideLoader = () => {
  if (activeRequests === 0) return;

  activeRequests -= 1;

  if (activeRequests > 0) return;

  const elapsed = Date.now() - lastShowTime;
  const delay = Math.max(0, MIN_VISIBLE_TIME - elapsed);

  hideTimeout = setTimeout(() => {
    loaderElement?.classList.remove('is-visible');
    hideTimeout = null;
  }, delay);
};
