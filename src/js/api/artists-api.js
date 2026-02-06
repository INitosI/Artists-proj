import instance from './axios-instance';

const fetchArtists = params =>
  instance.get('/artists', { params }).then(({ data }) => data);

export const getArtistsInfo = async params => {
  try {
    const response = await fetchArtists(params);
    const artists = response.artists;
  } catch (error) {}
};
