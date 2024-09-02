import axios from 'axios';

console.log('API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
