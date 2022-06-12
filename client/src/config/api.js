import axios from 'axios';

const url = process.env.SERVER_URL ||'https://dumb-sound.herokuapp.com/api/v1'
export const API = axios.create({
  baseURL: url,
  // baseURL: 'http://localhost:5000/api/v1/',
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin['Authorization'];
  }
};