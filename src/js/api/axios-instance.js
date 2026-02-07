import axios from 'axios';
import { showLoader, hideLoader } from '../utils/loader';
import { toast } from '../utils/toast';

const instance = axios.create({
  baseURL: 'https://sound-wave.b.goit.study/api',
  timeout: 10000,
});

let pendingRequests = 0;
const startLoading = () => {
  pendingRequests += 1;
  showLoader();
};
const stopLoading = () => {
  pendingRequests = Math.max(0, pendingRequests - 1);

  if (pendingRequests === 0) hideLoader();
};

instance.interceptors.request.use(
  config => {
    startLoading();
    return config;
  },
  error => {
    stopLoading();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    stopLoading();
    return response;
  },
  error => {
    stopLoading();

    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      (status
        ? `Error: ${status}`
        : 'Network error. Please check your connection.');

    toast.error(message);

    return Promise.reject({ message, status, original: error });
  }
);

export default instance;
