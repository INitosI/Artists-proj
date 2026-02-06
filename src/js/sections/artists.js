import { getArtistsInfo } from '../api/artists-api';

export const initArtists = async () => {
  getArtistsInfo({ limit: 8 });
};
