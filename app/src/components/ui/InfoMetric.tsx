import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

interface InfoMetricProps {
  label: string;
  value: string | number;
  style?: StyleProp<ViewStyle>;
}

const InfoMetric = ({
  label,
  value,
  style,
}: InfoMetricProps): React.JSX.Element => {
  const theme = useTheme();
  return (
    <View style={[styles.wrapper, style]}>
      <Text variant="titleSmall" style={{color: theme.colors.primary}}>
        {label}
      </Text>
      <Text variant="titleLarge">{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
});

export default InfoMetric;
