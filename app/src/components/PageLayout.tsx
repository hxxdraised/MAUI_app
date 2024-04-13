import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

function PageLayout({children}: PropsWithChildren): React.JSX.Element {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.background,
      }}>
      {children}
    </SafeAreaView>
  );
}
export default PageLayout;
