import {View, StyleSheet, SafeAreaView, Alert} from 'react-native';
import React, {Context, useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';
import {IAuthContext, IAxiosContext} from '../context/types';
import {Appbar, TextInput, Button} from 'react-native-paper';

const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecureEntry, setPasswordSecureEntry] = useState(false);

  const authContext = useContext(AuthContext as Context<IAuthContext>);
  const {publicAxios} = useContext(AxiosContext as Context<IAxiosContext>);

  const onLogin = async () => {
    try {
      const response = await publicAxios.post('/auth/login', {
        email,
        password,
      });

      const {accessToken} = response.data;
      authContext.setAuthState({
        accessToken,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
        }),
      );
    } catch (error: any) {
      Alert.alert('Login Failed', error.response.data.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
      }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Log in account" />
      </Appbar.Header>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          label="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          label="Password"
          secureTextEntry={passwordSecureEntry}
          onChangeText={text => setPassword(text)}
          value={password}
          right={
            <TextInput.Icon
              icon={passwordSecureEntry ? 'eye' : 'eye-off'}
              onPress={() => setPasswordSecureEntry(val => !val)}
              forceTextInputFocus={false}
            />
          }
        />
        <Button mode="contained" style={styles.button} onPress={onLogin}>
          Log in
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  logo: {
    fontSize: 60,
    margin: '20%',
  },
  form: {
    width: '90%',
    margin: '5%',
  },
  input: {
    fontSize: 15,
    paddingBottom: 5,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    fontSize: 30,
  },
});

export default Login;
