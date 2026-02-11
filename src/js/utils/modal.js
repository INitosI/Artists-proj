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

      renderModal(artist, albums, modalRoot);
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
        <div class="modal__artist-info">
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
    </div>
  `;
  modalRoot.style.display = 'grid';
};

const closeModal = modalRoot => {
  modalRoot.innerHTML = '';
  modalRoot.style.display = 'none';
  document.body.classList.remove('more-open');
};

const renderAlbums = albums => {
  if (!albums || !albums.length) return '';

  return `
    <div class="modal__albums">
      <h3 class="modal__albums-title">Albums</h3>
      <div class="modal__albums-list">
        ${albums.map(createAlbumCard).join('')}
      </div>
    </div>
  `;
};

const createAlbumCard = album => {
  const tracks = album.tracks || [];

  return `
    <div class="modal__album-card">
      <div class="album-card__header">
        <h4 class="album-card__title">${album.strAlbum}</h4>
        <span class="album-card__year">${album.intYearReleased || 'N/A'}</span>
      </div>
      <div class="album-card__tracks">
        ${tracks
          .map(
            track => `
          <div class="album-card__track">
            <span class="album-card__track-name">${track.strTrack}</span>
            <span class="album-card__track-time">${formatDuration(track.intDuration)}</span>
            ${
              track.movie
                ? `<a class="album-card__link" href="${track.movie}" target="_blank" rel="noopener noreferrer">
                   <svg width="20" height="20">
                     <use href="/img/icons.svg#icon-Youtube"></use>
                   </svg>
                 </a>`
                : `<span class="album-card__link-placeholder"></span>`
            }
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
};

const formatDuration = duration => {
  if (!duration) return '0:00';
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
