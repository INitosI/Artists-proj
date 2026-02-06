import instance from './axios-instance';

export const fetchFeedbacks = async (params) => {
  const response = await instance.get('/feedbacks', { params });

  /// перевірка, чи є response.data.data масивом, і якщо так, повертаємо його, інакше повертаємо порожній масив
  const list = Array.isArray(response?.data?.data) ? response.data.data : [];
  return list;
};
