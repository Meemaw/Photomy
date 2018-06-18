// @flow
import jwt_decode from 'jwt-decode';

const ACCESS_TOKEN: string = 'photomyApp';

export const isTokenValid = (token: string) => {
  const decoded = token && getData(token);

  const ts = ~~(Date.now() / 1000);
  return decoded && ts < decoded.exp;
};

export const getData = (token: string) => jwt_decode(token);

export const getAccessToken = (): Object => {
  const tokenData = localStorage.getItem(ACCESS_TOKEN);
  return tokenData ? JSON.parse(tokenData) : {};
};

export const setAccessToken = (jwt_payload: Object) => {
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(jwt_payload));
};
