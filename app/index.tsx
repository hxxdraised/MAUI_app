/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import PageLayout from './src/components/PageLayout';

const Root = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <PageLayout>
          <App />
        </PageLayout>
      </AxiosProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
