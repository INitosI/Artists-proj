// const getFeedbacks = params =>
//   instance.get('/feedbacks', { params }).then(({ data }) => data);

// export const fetchFeedbacks = async params => {
//   try {
//     const response = await getFeedbacks(params);
//     const artists = response.artists;
//   } catch (error) {}
// };

import instance from './axios-instance';

const getFeedbacks = async params =>
  await instance.get('/feedbacks', { params }).then(({ data }) => data);

export const fetchFeedbacks = async params => {
  const response = await getFeedbacks(params);
  return response.data || [];
};
