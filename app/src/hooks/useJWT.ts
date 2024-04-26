import {useCallback, useContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {AuthContext} from '../context/AuthContext';
import {FetchStatus} from '../types';
import {parseToken} from '../utils/parseToken';

const useJWT = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState(FetchStatus.LOADING);

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      if (value) {
        const jwt = JSON.parse(value.password);
        const role = jwt.accessToken ? parseToken(jwt.accessToken).role : null;
        authContext!.setAuthState({
          accessToken: jwt.accessToken || null,
          authenticated: jwt.accessToken !== null,
          role: role,
        });
        setStatus(FetchStatus.SUCCESS);
        return;
      }
      authContext!.setAuthState({
        accessToken: null,
        authenticated: false,
        role: null,
      });
      setStatus(FetchStatus.SUCCESS);
    } catch (error: any) {
      setStatus(FetchStatus.ERROR);
      console.log(`Keychain Error: ${error.message}`);
      authContext!.setAuthState({
        accessToken: null,
        authenticated: false,
        role: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {status, loadJWT};
};

export default useJWT;
