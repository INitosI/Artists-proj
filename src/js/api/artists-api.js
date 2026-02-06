import instance from './axios-instance';

export const fetchArtists = params => instance.get('/artists', { params });
