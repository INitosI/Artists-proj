import instance from './axios-instance';

export const fetchFeedbacks = params => instance.get('/feedbacks', { params });
