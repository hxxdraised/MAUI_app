import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';

interface InfoMetricProps {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  copyable?: boolean;
}

const InfoMetric = ({
  label,
  value,
  style,
  copyable = false,
}: InfoMetricProps): React.JSX.Element => {
  const theme = useTheme();
  return (
    <View style={[styles.wrapper, style]}>
      <Text
        variant="titleSmall"
        style={{color: theme.colors.primary, ...styles.label}}>
        {label}
      </Text>
      {copyable ? (
        <TouchableOpacity onPress={() => Clipboard.setString(value)}>
          <Surface
            style={{
              backgroundColor: theme.colors.surfaceVariant,
              ...styles.copyWrapper,
            }}
            mode="flat">
            <Text variant="bodyLarge">{value}</Text>
          </Surface>
        </TouchableOpacity>
      ) : (
        <Text variant="bodyLarge">{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 3,
  },
  copyWrapper: {
    padding: 5,
    borderRadius: 10,
  },
});

export default InfoMetric;
