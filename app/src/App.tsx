/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useEffect, useMemo} from 'react';
import PageLayout from './components/PageLayout';
import {AuthContext} from './context/AuthContext';
import Spinner from './components/ui/Spinner';
import Login from './screens/Login';
import Profile from './screens/Profile';
import {View} from 'react-native';
import useJWT from './hooks/useJWT';
import {FetchStatus} from './types';
import {BottomNavigation} from 'react-native-paper';
import AdminPanel from './screens/AdminPanel';
import ConfigsList from './screens/ConfigsList';
import UsersList from './screens/UsersList';

const userNavigationRoutes = [
  {key: 'configs', title: 'Configs', focusedIcon: 'key'},
  {key: 'profile', title: 'My profile', focusedIcon: 'account'},
];

const adminNavigationRoutes = [
  {key: 'adminPanel', title: 'Admin', focusedIcon: 'shield'},
  {key: 'users', title: 'Users', focusedIcon: 'account-multiple'},
];

const App = (): React.JSX.Element => {
  const authContext = useContext(AuthContext);
  const {status, loadJWT} = useJWT();
  const [sceneIndex, setSceneIndex] = React.useState(0);

  const routes = useMemo(() => {
    return authContext?.isAdmin() || authContext?.isSuperAdmin()
      ? [...adminNavigationRoutes, ...userNavigationRoutes]
      : userNavigationRoutes;
  }, [authContext]);

  const renderScene = BottomNavigation.SceneMap({
    adminPanel: AdminPanel,
    users: UsersList,
    configs: ConfigsList,
    profile: Profile,
  });

  useEffect(() => {
    if (!authContext?.authState?.authenticated && sceneIndex !== 0) {
      setSceneIndex(0);
    }
  }, [authContext, sceneIndex, setSceneIndex]);

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
        <BottomNavigation
          navigationState={{index: sceneIndex, routes}}
          onIndexChange={setSceneIndex}
          renderScene={renderScene}
        />
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
