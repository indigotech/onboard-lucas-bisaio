import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {requestLoginAccess} from '../service/login-request';
import {Navigation} from 'react-native-navigation';
import {styles} from '../styles/login-page-styles';
import {validatePassword, validateEmail} from '../service/validate-input-user';

import {Input} from '../styled-componentes/text-input-component';
import {Title, Label} from '../styled-componentes/text-component';
import {Button} from '../styled-componentes/button-component';
import {Caption} from '../styled-componentes/caption-component';

export interface PageProps<T> {
  componentId: string;
  rootTag: number;
  param?: T;
}

const LoginPage = (props: PageProps<void>) => {
  const [email, setEmail] = useState('');
  const [emailCaption, setEmailCaption] = useState(false);
  const [passwordCaption, setPasswordCaption] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!validatePassword(password)) {
      setPasswordCaption(true);
    } else {
      setPasswordCaption(false);
    }
    if (!validateEmail(email)) {
      setEmailCaption(true);
    } else {
      setEmailCaption(false);
    }
    if (validateEmail(email) && validatePassword(password)) {
      handleLogin();
    }
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await requestLoginAccess(email, password);
      goToHome();
    } catch (e) {
      Alert.alert('Something is wrong - ' + e);
    } finally {
      setLoading(false);
    }
  }

  function goToHome() {
    Navigation.push(props.componentId, {
      component: {
        name: 'UserList',
      },
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      <Title>Welcome to Taqtile!</Title>
      <View style={styles.viewLogin}>
        <Label color={emailCaption ? '#F00' : '#777777'}>E-mail</Label>
        <Input
          color={emailCaption ? '#F00' : '#777777'}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        {emailCaption && <Caption>{`Email "${email}" is not valid.`}</Caption>}
        <Label color={passwordCaption ? '#F00' : '#777777'}>Senha</Label>
        <Input
          color={passwordCaption ? '#F00' : '#777777'}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {passwordCaption && (
          <Caption>
            Password must to have at least one letter and one number
          </Caption>
        )}
      </View>
      <Button onPress={handleSubmit} title="Entrar" />
    </KeyboardAvoidingView>
  );
};

LoginPage.options = {
  topBar: {
    title: {
      text: 'Login Page',
    },
  },
};

export default LoginPage;
