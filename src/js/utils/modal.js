import { fetchArtistById } from '../api/fake-data.js';

export const initModal = () => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    console.error('modal-root not found');
    return;
  }

  document.addEventListener('click', async event => {
    const trigger = event.target.closest('[data-id]');
    if (!trigger) return;

    const artistId = trigger.dataset.id;

    modalRoot.innerHTML = `
      <div class="modal__content">
        <div class="modal__loader"></div>
      </div>
    `;
    modalRoot.style.display = 'flex';

    try {
      const artist = await fetchArtistById(artistId);

      if (!artist) {
        console.error('Artist not found');
        modalRoot.style.display = 'none';
        return;
      }

      renderModal(artist, modalRoot);
    } catch (error) {
      console.error(error);
      modalRoot.style.display = 'none';
    }
  });

  modalRoot.addEventListener('click', event => {
    if (
      event.target === modalRoot ||
      event.target.classList.contains('modal__close-btn')
    ) {
      closeModal(modalRoot);
    }
  });
};

const renderModal = (artist, modalRoot) => {
  modalRoot.innerHTML = `
    <div class="modal__content" role="dialog" aria-modal="true">
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
            <h3 class="modal__description-bio-title">Biography</h3>
            <p class="modal__description-bio-text">${artist.bio}</p>
          </div>

          <ul class="modal__description-genres-list">
            ${artist.genres
              .map(
                genre =>
                  `<li class="modal__description-genres-item">${genre}</li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  modalRoot.style.display = 'flex';
};

const closeModal = modalRoot => {
  modalRoot.innerHTML = '';
  modalRoot.style.display = 'none';
};
