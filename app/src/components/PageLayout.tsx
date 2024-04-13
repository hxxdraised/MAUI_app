import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function PageLayout({children}: PropsWithChildren): React.JSX.Element {
  return (
    <SafeAreaView
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {children}
    </SafeAreaView>
  );
}
export default PageLayout;
