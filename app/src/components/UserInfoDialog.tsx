import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Dialog,
  Portal,
  Button,
  Avatar,
  Badge,
  Text,
  useTheme,
} from 'react-native-paper';
import {IUser} from '../types';
import InfoMetric from './ui/InfoMetric';

interface UserInfoDialogProps {
  user: IUser;
  hideDialog: () => void;
}

const UserInfoDialog = ({
  user,
  hideDialog,
}: UserInfoDialogProps): React.JSX.Element => {
  const theme = useTheme();
  return (
    <Portal>
      <Dialog visible onDismiss={hideDialog}>
        <Dialog.Icon icon="account" />
        <Dialog.Title style={styles.title}>User info</Dialog.Title>
        <Dialog.Content>
          <View style={styles.avatarBlock}>
            <View style={styles.avatar}>
              <Avatar.Image size={65} source={{uri: user?.avatarUrl}} />
              {user?.role === 'ADMIN' ||
                (user?.role === 'SUPERADMIN' && (
                  <Badge
                    style={{
                      ...styles.adminBadge,
                      backgroundColor: theme.colors.primary,
                    }}>
                    {user?.role}
                  </Badge>
                ))}
            </View>
            <View>
              <Text variant="headlineSmall">{user.name}</Text>
              <Text variant="titleSmall" style={{color: theme.colors.primary}}>
                {user.email}
              </Text>
            </View>
          </View>
          <InfoMetric label="ID" value={user?.id} copyable />
          <InfoMetric label="Role" value={user?.role} />
          <InfoMetric
            label="Created at"
            value={new Date(user.createdAt).toLocaleString()}
          />
          <InfoMetric
            label="Updated at"
            value={new Date(user.updatedAt).toLocaleString()}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  loadingWrapper: {
    paddingTop: 200,
    paddingBottom: 200,
  },
  avatarBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 20,
  },
  avatar: {
    position: 'relative',
  },
  adminBadge: {
    position: 'absolute',
    bottom: -10,
  },
});

export default UserInfoDialog;
