import * as jwt_decode from 'jwt-decode';

const ACCESS_TOKEN: string = 'photomyApp';

export type AuthToken = {
  exp: number;
};

export type AccessToken = {
  token: string;
};

export const isTokenValid = (token: string): boolean => {
  if (!token) {
    return false;
  }
  const decoded = getData(token);

  const ts = ~~(Date.now() / 1000);
  return decoded ? ts < decoded.exp : false;
};

const getData = (token: string): AuthToken => jwt_decode(token);

export const getAccessToken = (): AccessToken => {
  const tokenData = localStorage.getItem(ACCESS_TOKEN);
  return tokenData ? JSON.parse(tokenData) : {};
};

export const setAccessToken = (jwt_payload: any) => {
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(jwt_payload));
};
