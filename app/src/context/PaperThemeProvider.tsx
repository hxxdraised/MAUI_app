import React, {PropsWithChildren, useMemo} from 'react';
import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const PaperThemeProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const {theme} = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? {...MD3DarkTheme, colors: theme.dark}
        : {
            ...MD3LightTheme,
            colors: {
              ...theme.light,
              background: theme.light.inverseOnSurface,
            },
          },
    [colorScheme, theme],
  );

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
};

export default PaperThemeProvider;
