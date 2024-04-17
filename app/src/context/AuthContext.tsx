import React, {PropsWithChildren, createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {IAuthState, IAuthContext} from './types';

const AuthContext = createContext<IAuthContext | null>(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}: PropsWithChildren): React.JSX.Element => {
  const [authState, setAuthState] = useState<IAuthState>({
    accessToken: null,
    authenticated: null,
    role: null,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      authenticated: false,
      role: null,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};
