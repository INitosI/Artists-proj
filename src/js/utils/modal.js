import { fetchArtistAlbums, fetchAlbumTracks } from '../api/artists-api';
import { showLoader, hideLoader } from './loader';
import { toast } from '/js/utils/toast.js';
import { renderArtistCard, setupArtistListeners } from './renderArtistCard';

const list = document.querySelector('.artists__list');

const modalRoot = document.querySelector('.modal__albums');

export async function initAlbums(artistId) {
  try {
    showLoader();
    const [artist, albums] = await Promise.all([
      fetchArtistById(artistId),
      fetchArtistAlbums(artistId),
    ]);
    return { artist, albums };
  } catch (error) {
    console.error(error);
    toast.error('Failed to load albums');
    return null;
  } finally {
    hideLoader();
  }
}

async function loadAlbums(artistId) {
  try {
    showLoader();

    const { artist, albums } = await initAlbums(artistId);

    const modalHTML = renderModal(artist, albums);
    modalRoot.innerHTML = modalHTML;
  } catch (error) {
    console.error(error);
    toast.error('Failed to load albums');
  } finally {
    hideLoader();
  }
}
function renderAlbums(albums = []) {
  if (!albums.length) {
    return `<p>Альбоми відсутні</p>`;
  }

  return albums
    .map(album => {
      const { strAlbum, intYearReleased, tracks = [] } = album;

      const tracksMarkup = tracks.length
        ? tracks
            .map(
              track => `
            <li class="tracks__item">
              <span class="tracks__name">${track.strTrack || 'Невідома назва'}</span>
              <span class="tracks__time">${track.intDuration ? formatTime(track.intDuration) : '--:--'}</span>
              ${
                track.movie
                  ? `<a href="${track.movie}" target="_blank" rel="noopener noreferrer" class="tracks__link">YouTube</a>`
                  : ''
              }
            </li>
          `
            )
            .join('')
        : '<li>Немає треків</li>';

      return `
        <div class="album__card">
          <h3 class="album__title">${strAlbum || 'Невідомий альбом'}</h3>
          <span class="album__year">${intYearReleased || '—'}</span>
          <ul class="album__tracks-list">
            ${tracksMarkup}
          </ul>
        </div>
      `;
    })
    .join('');
}

export function setupArtistListeners(container) {
  container.addEventListener('click', async e => {
    const btn = e.target.closest('.artists__learn-more');
    if (!btn) return;

    const artistId = btn.dataset.id;

    const artistCard = btn.closest('.artist__card');
    const albumsContainer = artistCard.querySelector('.albums__container');

    try {
      const albums = await fetchArtistAlbums(artistId);
      albumsContainer.innerHTML = renderAlbums(albums);
      albumsContainer.dataset.loaded = 'true';
    } catch (error) {
      toast.error('Failed to load albums');
    }
  });
}

export function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function renderArtistCard(artistData) {
  const { strArtist, strBiographyEN, albumsList = [] } = artistData;
  const albumsCount = albumsList.length;

  const albumsMarkup = albumsList
    .map(album => {
      const { strAlbum, intYearReleased, tracks = [] } = album;

      const tracksMarkup = tracks.length
        ? tracks
            .map(
              track => `
            <li class="tracks__item">
              <span class="tracks__name">${track.strTrack || 'Невідома назва'}</span>
              <span class="tracks__time">
                ${track.intDuration ? formatTime(track.intDuration) : '--:--'}
              </span>
              ${
                track.movie
                  ? `<a href="${track.movie}" target="_blank" rel="noopener noreferrer" class="tracks__link"><svg class="icon icon-Vector"><use xlink:href="#icon-Vector"></use></svg></a>`
                  : ''
              }
            </li>
          `
            )
            .join('')
        : '<li>Немає треків</li>';

      return `
        <div class="album__card" data-album-id="${album._id}">
          <h3 class="album__title">${strAlbum || 'Невідомий альбом'}</h3>
          <ul class="album__tracks-list">
            ${tracksMarkup}
          </ul>
        </div>
      `;
    })
    .join('');
}
