/**
 * @format
 */

import React, {useMemo} from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import PageLayout from './src/components/PageLayout';
import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';

const Root = () => {
  const colorScheme = useColorScheme();
  const {theme} = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? {...MD3DarkTheme, colors: theme.dark}
        : {...MD3LightTheme, colors: theme.light},
    [colorScheme, theme],
  );

  return (
    <AuthProvider>
      <AxiosProvider>
        <PaperProvider theme={paperTheme}>
          <PageLayout>
            <App />
          </PageLayout>
        </PaperProvider>
      </AxiosProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
