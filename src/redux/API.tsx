import { Platform } from 'react-native';


export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://localhost:3000'
    : 'http://localhost:3000';


export const CHECK_USERNAME = `${BASE_URL}/oauth/check-username`;
export const REGISTER = `${BASE_URL}/oauth/register`;
export const LOGIN = `${BASE_URL}/oauth/login`;
export const REFRESH_TOKEN = `${BASE_URL}/oauth/refresh_token`;
export const UPLOAD = `${BASE_URL}/file/upload`;
export const GIPHY_API_KEY = 'YOUR_GIPHY_API_KEY';
