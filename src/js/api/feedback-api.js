
import instance from './axios-instance';

const getFeedbacks = async params =>
  await instance.get('/feedbacks', { params }).then(({ data }) => data);

export const fetchFeedbacks = async params => {
  const response = await getFeedbacks(params);
  return response.data || [];
};

// створюємо відгук через API
export const createFeedback = async body => {
  const response = await instance.post('/feedbacks', body).then(({ data }) => data);
  return response;
};