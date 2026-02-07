import instance from './axios-instance';

const fetchArtists = params =>
  instance.get('/artists', { params }).then(({ data }) => data);

export const getArtistsInfo = async params => {
  const response = await fetchArtists(params);
  return response.artists || [];
};
