import React from 'react';
import {ScrollView, Text} from 'react-native';

import {useMaterialYouTheme} from '../../theme';

function Home(): React.JSX.Element {
  const theme = useMaterialYouTheme();
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}>
        <Text style={{color: theme.text}}>Recommended for you</Text>
        <Text style={{color: theme.text}}>Recommended for you</Text>
        <Text style={{color: theme.text}}>Recommended for you</Text>
      </ScrollView>
    </>
  );
}

export default Home;
