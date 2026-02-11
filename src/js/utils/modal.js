import { fetchArtistById, fetchArtistAlbums } from '../api/artists-api.js';

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
    document.body.classList.add('more-open');

    try {
      const [artist, albums] = await Promise.all([
        fetchArtistById(artistId),
        fetchArtistAlbums(artistId),
      ]);

      if (!artist) {
        modalRoot.style.display = 'none';
        return;
      }

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

const renderModal = (artist, albums, modalRoot) => {
  modalRoot.innerHTML = `
    <div class="modal__content" role="dialog" aria-modal="true">

      <div class="modal__header">
        <button class="modal__close-btn" aria-label="Close modal">&times;</button>
        <h2 class="modal__title">${artist.strArtist}</h2>
      </div>

      <div class="modal__body">
        <div class="modal__image-artist">
          <img class="modal__image-artist-img" src="${artist.strArtistThumb}" alt="${artist.strArtistThumb}">
        </div>

        <div class="modal__description">
          <div class="modal__description-grid">
            <div class="modal__description-item" id="left-item">
              <h3 class="modal__description-title">Years active</h3>
              <p class="modal__description-value">${artist.yearsActive}</p>

              <h3 class="modal__description-title marg" id="members-title">Members</h3>
              <p class="modal__description-value" id="members-value">${artist.intMembers}</p>
            </div>

            <div class="modal__description-item" id="right-item">
              <h3 class="modal__description-title" id="sex-title">Sex</h3>
              <p class="modal__description-value" id="sex-value">${artist.strGender}</p>

              <h3 class="modal__description-title marg">Country</h3>
              <p class="modal__description-value">${artist.strCountry}</p>
            </div>
  
              <div class="modal__description-bio">
                <h3 class="modal__description-bio-title">Biography</h3>
  
                <div class="modal__description-bio-scroll">
                  <p class="modal__description-bio-text">${artist.strBiographyEN}</p>
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
      ${renderAlbums(albums)}
    </div>
  `;
  modalRoot.style.display = 'grid';
};

          <div class="modal__description-bio">
            <h3 class="modal__description-bio-title">Biography</h3>
            <div class="modal__description-bio-scroll">
              <p class="modal__description-bio-text">${artist.strBiographyEN}</p>
            </div>
          </div>

          <ul class="modal__description-genres-list">
            ${artist.genres.map(genre => `<li class="modal__description-genres-item">${genre}</li>`).join('')}
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
  document.body.classList.remove('more-open');
};
