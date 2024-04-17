/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useEffect} from 'react';
import PageLayout from './components/PageLayout';
import {AuthContext} from './context/AuthContext';
import Spinner from './components/ui/Spinner';
import Login from './components/Login';
import Home from './components/Home';
import {View} from 'react-native';
import useJWT from './hooks/useJWT';
import {FetchStatus} from './types';

const App = (): React.JSX.Element => {
  const authContext = useContext(AuthContext);
  const {status, loadJWT} = useJWT();

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === FetchStatus.LOADING) {
    return (
      <PageLayout>
        <View style={styles.loadingWrapper}>
          <Spinner size={50} />
        </View>
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
        <Home />
      </PageLayout>
    );
  }
};

const styles = {
  loadingWrapper: {
    paddingTop: 100,
    paddingBottom: 100,
  },
};

export default App;
