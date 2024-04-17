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
import {BottomNavigation, Text} from 'react-native-paper';

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

  const AdminPanelRoute = () => <Text>Admin panel</Text>;
  const UsersRoute = () => <Text>Users</Text>;
  const ConfigsRoute = () => <Text>Configs</Text>;

  const routes = useMemo(() => {
    return authContext?.isAdmin() || authContext?.isSuperAdmin()
      ? [...adminNavigationRoutes, ...userNavigationRoutes]
      : userNavigationRoutes;
  }, [authContext]);

  const renderScene = BottomNavigation.SceneMap({
    adminPanel: AdminPanelRoute,
    users: UsersRoute,
    configs: ConfigsRoute,
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
