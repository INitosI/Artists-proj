import { getArtistsInfo } from '../api/artists-api';

export const initArtists = async ({ limit, page }) => {
  return getArtistsInfo({ limit, page });
};

