import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {useMaterialYouTheme} from '../../theme';

function PageLayout({children}: PropsWithChildren): React.JSX.Element {
  const theme = useMaterialYouTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        ...StyleSheet.absoluteFillObject,
      }}>
      {children}
    </SafeAreaView>
  );
}
export default PageLayout;
