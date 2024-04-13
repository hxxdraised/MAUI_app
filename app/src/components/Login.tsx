import {View, StyleSheet, SafeAreaView} from 'react-native';
import React, {Context, useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';
import {IAuthContext, IAxiosContext} from '../context/types';
import {TextInput, Button, Portal, Dialog, Text} from 'react-native-paper';

const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecureEntry, setPasswordSecureEntry] = useState(false);

  const [authErrorVisible, setAuthErrorVisible] = React.useState(false);
  const [authErrorText, setAuthErrorText] = React.useState('');

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
      setAuthErrorText(error.response.data.message);
      setAuthErrorVisible(true);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <Text style={styles.title} variant="titleLarge">
          Log in account
        </Text>
        <TextInput
          style={styles.input}
          label="E-mail"
          textContentType="emailAddress"
          placeholder="Your e-mail address"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          label="Password"
          textContentType="password"
          placeholder="Your password"
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
        <Button
          mode="contained"
          style={styles.button}
          onPress={onLogin}
          disabled={!email || !password}>
          Log in
        </Button>
      </View>
      <Portal>
        <Dialog
          visible={authErrorVisible}
          onDismiss={() => setAuthErrorVisible(false)}>
          <Dialog.Title>Login Failed</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{authErrorText}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAuthErrorVisible(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 30,
  },
  form: {
    width: '90%',
    margin: '5%',
    height: '100%',
    paddingTop: '25%',
  },
  input: {
    fontSize: 15,
    paddingBottom: 5,
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    fontSize: 30,
  },
});

export default Login;
