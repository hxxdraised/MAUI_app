/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useContext, useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import PageLayout from './components/PageLayout';
import {AuthContext} from './context/AuthContext';
import Spinner from './components/Spinner';
import Login from './components/Login';
import Home from './components/Home';

const App = (): React.JSX.Element => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      if (value) {
        const jwt = JSON.parse(value.password);

        authContext!.setAuthState({
          accessToken: jwt.accessToken || null,
          authenticated: jwt.accessToken !== null,
        });
        setStatus('success');
      }
    } catch (error: any) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext!.setAuthState({
        accessToken: null,
        authenticated: false,
      });
    }
  }, [authContext]);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );
  }

  if (authContext?.authState?.authenticated === false) {
    return (
      <PageLayout>
        <Login />
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        {/* <Dashboard /> */}
        <Home />
      </PageLayout>
    );
  }
};

export default App;
