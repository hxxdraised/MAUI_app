import {AxiosInstance} from 'axios';
import React from 'react';

export interface IAuthState {
  accessToken: string | null;
  authenticated: boolean | null;
}

export interface IAuthContext {
  authState: IAuthState;
  getAccessToken: () => string | null;
  setAuthState: React.Dispatch<IAuthState>;
  logout: () => void;
}

export interface IAxiosContext {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
}
