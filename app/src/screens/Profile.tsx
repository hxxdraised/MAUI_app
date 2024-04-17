import React, {Context, useContext, useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import {IAuthContext, IAxiosContext} from '../context/types';
import {AxiosContext} from '../context/AxiosContext';
import {Avatar, Badge, Button, Text, useTheme} from 'react-native-paper';
import {IUser} from '../types';
import Spinner from '../components/ui/Spinner';
import InfoMetric from '../components/ui/InfoMetric';

function Profile(): React.JSX.Element {
  const theme = useTheme();
  const authContext = useContext(AuthContext as Context<IAuthContext>);
  const {authAxios} = useContext(AxiosContext as Context<IAxiosContext>);
  const [userInfo, setUserInfo] = React.useState<IUser | null>(null);

  useEffect(() => {
    authAxios.get('/me').then(response => {
      setUserInfo(response.data);
    });
  }, [authAxios]);

  const isAdmin = useMemo(
    () => userInfo && ['ADMIN', 'SUPERADMIN'].includes(userInfo?.role),
    [userInfo],
  );
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Profile info
        </Text>
        {userInfo ? (
          <View>
            <View style={styles.avatarBlock}>
              <View style={styles.avatar}>
                <Avatar.Image size={80} source={{uri: userInfo.avatarUrl}} />
                {isAdmin && (
                  <Badge
                    style={{
                      ...styles.adminBadge,
                      backgroundColor: theme.colors.primary,
                    }}>
                    {userInfo.role}
                  </Badge>
                )}
              </View>
              <Text variant="headlineSmall">{userInfo.name}</Text>
              <Text variant="titleSmall" style={{color: theme.colors.primary}}>
                {userInfo.email}
              </Text>
            </View>
            <InfoMetric
              label="Created at"
              value={new Date(userInfo.createdAt).toLocaleString()}
            />
            <InfoMetric
              label="Updated at"
              value={new Date(userInfo.updatedAt).toLocaleString()}
            />
            <InfoMetric
              label="VPNs on this account"
              value={userInfo.vpn.length}
              style={{marginBottom: 30}}
            />
            <Button mode="contained-tonal" onPress={authContext.logout}>
              Log out
            </Button>
          </View>
        ) : (
          <View style={styles.loadingWrapper}>
            <Spinner size={50} />
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    marginBottom: 50,
  },
  avatarBlock: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    position: 'relative',
    marginBottom: 20,
  },
  loadingWrapper: {
    paddingTop: 100,
    paddingBottom: 100,
  },
  adminBadge: {
    position: 'absolute',
    bottom: -10,
  },
});

export default Profile;
