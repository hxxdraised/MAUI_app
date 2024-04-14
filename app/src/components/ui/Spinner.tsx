import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

interface SpinnerProps {
  size?: number | 'small' | 'large';
}

const Spinner = ({size = 'large'}: SpinnerProps): React.JSX.Element => (
  <View style={styles.container}>
    <ActivityIndicator size={size} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
