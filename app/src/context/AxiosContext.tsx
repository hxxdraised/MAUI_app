import React, {PropsWithChildren, createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import {IAxiosContext} from './types';

const AxiosContext = createContext<IAxiosContext | null>(null);
const {Provider} = AxiosContext;

const AxiosProvider = ({children}: PropsWithChildren): React.JSX.Element => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: 'http://89.110.90.70:8000/api',
  });

  const publicAxios = axios.create({
    baseURL: 'http://89.110.90.70:8000/api',
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext!.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};
