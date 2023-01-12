import axios from 'axios';

const axiosWithAuth = (token) => {
  const instance = axios.create();
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return instance
};

export default axiosWithAuth;