/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {ThemeProvider} from '../theme';
import Home from './components/Home';
import PageLayout from './components/PageLayout';

function App(): React.JSX.Element {
  return (
    <ThemeProvider
      seedColor="auto"
      colorScheme="auto"
      fallbackColor="#1b6ef3"
      generationStyle="TONAL_SPOT">
      <PageLayout>
        <Home />
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
