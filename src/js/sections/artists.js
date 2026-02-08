import { getArtistsInfo } from '../api/artists-api';

export const initArtists = async ({ limit, page }) => {
  return getArtistsInfo({ limit, page });
};
document.addEventListener('DOMContentLoaded', async () => {
  const page = 1;
  const params = { limit: 8, page };

  await initArtists(params);
});
