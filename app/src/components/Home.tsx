import React, {Context, useContext, useState} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';

import {useMaterialYouTheme} from '../../theme';
import {AuthContext} from '../context/AuthContext';
import {IAuthContext} from '../context/types';

function Home(): React.JSX.Element {
  const theme = useMaterialYouTheme();
  const authContext = useContext(AuthContext as Context<IAuthContext>);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}>
        <Text style={{color: theme.text, paddingBottom: 100, paddingTop: 100}}>
          Authorized succsessfully
        </Text>
        <Button
          title="Log out"
          onPress={() => authContext.logout()}
          color={theme.card}
        />
      </ScrollView>
    </>
  );
}

export default Home;
