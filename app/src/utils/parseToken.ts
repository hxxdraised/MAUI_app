import 'core-js/stable/atob';
import {UserRole} from '../types';

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export const parseToken = (token: string): JwtPayload => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};
