import { getArtistsInfo } from '../api/artists-api';

export const initArtists = async ({ limit, page }) => {
  return getArtistsInfo({ limit, page });
};

const page = 1;
const params = { limit: 8, page };
const responceArtists = await initArtists(params);
