import axios from 'axios';

const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

const apiXRates = axios.create({
  baseURL: BASE_URL,
});

export default apiXRates;
