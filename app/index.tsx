/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import PageLayout from './src/components/PageLayout';
import PaperThemeProvider from './src/context/PaperThemeProvider';

const Root = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <PaperThemeProvider>
          <PageLayout>
            <App />
          </PageLayout>
        </PaperThemeProvider>
      </AxiosProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
