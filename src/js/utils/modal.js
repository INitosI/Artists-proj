import { fetchArtistById } from '../api/fake-data.js';

const modalRoot = document.getElementById('modal-root');

export const initModal = () => {
  // Відкриття модалки при кліку на елемент з data-artist-id
  document.addEventListener('click', async event => {
    const trigger = event.target.closest('[data-artist-id]');
    if (!trigger) return;

    const artistId = Number(trigger.dataset.artistId);

    try {
      const { data } = await fetchArtistById(artistId);

      if (!data) {
        console.error('Artist not found');
        return;
      }

      renderModal(data);
    } catch (error) {
      console.error(error);
    }
  });

  // Закриття модалки при кліку на бекдроп або на кнопку
  modalRoot.addEventListener('click', e => {
    if (
      e.target === modalRoot ||
      e.target.classList.contains('modal__close-btn')
    ) {
      closeModal();
    }
  });
};

// Функція рендеру модалки
const renderModal = artist => {
  modalRoot.innerHTML = `
    <div class="modal__content" role="dialog" aria-modal="true" data-artist-id="${artist.id}">
      <button class="modal__close-btn" aria-label="Close modal">&times;</button>

      <h2 class="modal__title">${artist.name}</h2>

      <div class="modal__body">
        <div class="modal__image-artist">
          <img src="${artist.image}" alt="${artist.name}">
        </div>

        <div class="modal__description">
          <div class="modal__description-grid">
            <div class="modal__description-item">
              <h3 class="modal__description-title">Years active</h3>
              <p class="modal__description-value">${artist.yearsActive}</p>
            </div>
            <div class="modal__description-item">
              <h3 class="modal__description-title">Sex</h3>
              <p class="modal__description-value">${artist.sex}</p>
            </div>
            <div class="modal__description-item">
              <h3 class="modal__description-title">Members</h3>
              <p class="modal__description-value">${artist.members}</p>
            </div>
            <div class="modal__description-item">
              <h3 class="modal__description-title">Country</h3>
              <p class="modal__description-value">${artist.country}</p>
            </div>
          </div>

          <div class="modal__description-bio">
            <h3>Biography</h3>
            <p>${artist.bio}</p>
          </div>

          <div class="modal__description-genres">
            <ul class="modal__description-genres-list">
              ${artist.genres ? artist.genres.map(genre => `<li class="modal__description-genres-item">${genre}</li>`).join('') : ''}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  modalRoot.style.display = 'flex';
};

// Закриття модалки
const closeModal = () => {
  modalRoot.innerHTML = '';
  modalRoot.style.display = 'none';
};
