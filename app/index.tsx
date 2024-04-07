/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import {ThemeProvider} from './theme';
import PageLayout from './src/components/PageLayout';

const Root = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <ThemeProvider
          seedColor="auto"
          colorScheme="auto"
          fallbackColor="#1b6ef3"
          generationStyle="TONAL_SPOT">
          <PageLayout>
            <App />
          </PageLayout>
        </ThemeProvider>
      </AxiosProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
