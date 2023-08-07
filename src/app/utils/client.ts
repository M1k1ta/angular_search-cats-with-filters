import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});
//https://api.thecatapi.com/v1/breeds?limit=1
//&api_key=live_t5w81Zu0VWKNY6YJSy6lSo7wO5Pqfl35DIKNDKInAI4tPXNDXLaI8gSrIeYuZ5qv

