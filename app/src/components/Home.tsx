import React, {Context, useContext} from 'react';
import {Button, ScrollView, Text} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import {IAuthContext} from '../context/types';

function Home(): React.JSX.Element {
  const authContext = useContext(AuthContext as Context<IAuthContext>);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}>
        <Text style={{paddingBottom: 100, paddingTop: 100}}>
          Authorized succsessfully
        </Text>
        <Button title="Log out" onPress={() => authContext.logout()} />
      </ScrollView>
    </>
  );
}

export default Home;
