import { fetchArtistById } from '../api/artists-api.js';

export const initModal = () => {
  const modalRoot = document.getElementById('modal-root');

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
        modalRoot.style.display = 'none';
        return;
      }

      console.log(artist);

      renderModal(artist, modalRoot);
    } catch (error) {
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

      <h2 class="modal__title">${artist.strArtist} <button class="modal__close-btn" aria-label="Close modal">&times;</button></h2>

      <div class="modal__body">
        <div class="modal__image-artist">
          <img  class="modal__image-artist-img" src="${artist.strArtistThumb}" alt="${artist.strArtistThumb}">
        </div>

        <div class="modal__description">
          <div class="modal__description-grid">
            <div class="modal__description-item">
              <h3 class="modal__description-title ">Years active</h3>
              <p class="modal__description-value">${artist.yearsActive}</p>

              <h3 class="modal__description-title marg">Sex</h3>
              <p class="modal__description-value">${artist.strGender}</p>
            </div>

            <div class="modal__description-item ">
              <h3 class="modal__description-title ">Members</h3>
              <p class="modal__description-value">${artist.intMembers}</p>

              <h3 class="modal__description-title marg">Country</h3>
              <p class="modal__description-value">${artist.strCountry}</p>
            </div>
          </div>

            <div class="modal__description-bio">
              <h3 class="modal__description-bio-title">Biography</h3>

              <div class="modal__description-bio-scroll">
                <p class="modal__description-bio-text">${artist.strBiographyEN}</p>
              </div>
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
