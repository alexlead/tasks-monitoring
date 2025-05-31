import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
       "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
});

export default apiClient;