import React, {Context, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dialog, Portal, Button, Text, useTheme} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {IVpnConfig, IVpnConfigInfo} from '../types';
import InfoMetric from './ui/InfoMetric';
import {IAxiosContext} from '../context/types';
import {AxiosContext} from '../context/AxiosContext';
import Spinner from './ui/Spinner';

interface VpnConfigDialogProps {
  config: IVpnConfigInfo | null;
  hideDialog: () => void;
}

const VpnConfigDialog = ({
  config,
  hideDialog,
}: VpnConfigDialogProps): React.JSX.Element => {
  const theme = useTheme();
  const {authAxios} = useContext(AxiosContext as Context<IAxiosContext>);
  const [configData, setConfigData] = React.useState<IVpnConfig | null>(null);
  const [showQrCode, setShowQrCode] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (config) {
      authAxios.get(`/me/vpn/${config.id}`).then(response => {
        setConfigData(response.data);
      });
    }
  }, [authAxios, config]);

  return (
    <Portal>
      <Dialog visible onDismiss={hideDialog}>
        <Dialog.Icon icon="key" />
        <Dialog.Title style={styles.title}>{config?.name}</Dialog.Title>
        <Dialog.Content>
          {configData === null ? (
            <View style={styles.loadingWrapper}>
              <Spinner />
            </View>
          ) : (
            <>
              <InfoMetric label="ID" value={configData!.id} />
              <InfoMetric label="Name" value={configData!.name} />
              <InfoMetric
                label="Config name"
                value={configData!.configurationName}
              />
              {showQrCode ? (
                <>
                  <Text
                    variant="titleSmall"
                    style={{color: theme.colors.primary, marginBottom: 10}}>
                    Config
                  </Text>
                  <QRCode
                    size={270}
                    value={configData!.config}
                    color={theme.colors.onSurface}
                    backgroundColor={theme.colors.elevation.level0}
                  />
                </>
              ) : (
                <InfoMetric label="Config" value={configData!.config} />
              )}
            </>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => setShowQrCode(val => !val)}
            icon={showQrCode ? 'key' : 'qrcode'}>
            {showQrCode ? 'Show config' : 'Show QR code'}
          </Button>
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
});

export default VpnConfigDialog;
