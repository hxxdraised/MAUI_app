import {AxiosInstance} from 'axios';
import React from 'react';
import {UserRole} from '../types';

export interface IAuthState {
  accessToken: string | null;
  authenticated: boolean | null;
  role: UserRole | null;
}

export interface IAuthContext {
  authState: IAuthState;
  getAccessToken: () => string | null;
  setAuthState: React.Dispatch<IAuthState>;
  logout: () => void;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

export interface IAxiosContext {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
}
