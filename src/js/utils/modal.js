import { fetchArtistById, fetchArtistAlbums } from '../api/artists-api.js';

export const initModal = () => {
  const modalRoot = document.getElementById('modal-root');
const btn = document.querySelector('.artists__learn-more');
  btn.addEventListener('click', async event => {
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

      console.log(artist);

      renderModal(artist,albums, modalRoot);
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

      <div class="modal__header">
          <button class="modal__close-btn" aria-label="Close modal">&times;</button>
          <h2 class="modal__title">${artist.strArtist}</h2>
      </div>


      <div class="modal__body">
        <div class="modal__image-artist">
          <img  class="modal__image-artist-img" src="${artist.strArtistThumb}" alt="${artist.strArtistThumb}">
        </div>

        <div class="modal__description">
          <div class="modal__description-grid">
            <div class="modal__description-item">
              <h3 class="modal__description-title ">Years active</h3>
              <p class="modal__description-value">${artist.yearsActive}</p>

              <h3 class="modal__description-title marg">Members</h3>
              <p class="modal__description-value">${artist.intMembers}</p>
            </div>

            <div class="modal__description-item ">
            <h3 class="modal__description-title">Sex</h3>
              <p class="modal__description-value">${artist.strGender}</p>

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
      ${renderAlbums(artist.albums)}
    </div>
  `;
  modalRoot.style.display = 'flex';
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
  return `
    <ul class="modal__album-card">
    <h4 class="modal__albums-card-title"
    ></h4>
      <h4 class="album-card__title">${album.strAlbum}</h4>

      <div class="album-card__header">
        <span>Track</span>
        <span>Time</span>
        <span>Link</span>
      </div>
      <div class="modal__albums-tracks">
        ${album.tracks
          .map(track => {
            const minutes = Math.floor(track.intDuration / 60000);
            const seconds = Math.floor(
              (track.intDuration % 60000) / 1000
            ).toString().padStart(2, '0');

            return `
              <li class="album-card__track">
                <span>${track.strTrack}</span>
                <span>${minutes}:${seconds}</span>
                ${
                  track.movie && track.movie !== 'null'
                    ? `<a href="${track.movie}" target="_blank" rel="noopener noreferrer" class="album-card__link"><svg class="icon icon-Vector"><use xlink:href="#icon-Vector"></use></svg></a>`
                    : ''
                }
              </li>
            `;
          })
          .join('')}
      </ul>
    </div>
  `;
};


const closeModal = modalRoot => {
  modalRoot.innerHTML = '';
  modalRoot.style.display = 'none';
  document.body.classList.remove('more-open');
};
