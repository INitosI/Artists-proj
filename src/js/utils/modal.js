export const initModal = () => {
  const modal = document.getElementById('modal');
  const modalOpen = document.querySelector('.modal-open');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  // Відкрити модалку
  if (modalOpen) {
    modalOpen.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  // Закрити модалку по кнопці закриття
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Закрити модалку при натисканні на оверлей
  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Закрити модалку по ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modal.classList.remove('active');
    }
  });
};
