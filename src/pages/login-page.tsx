import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
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
  const email = useRef<string>('');
  const password = useRef<string>('');
  const [emailCaption, setEmailCaption] = useState<boolean>(false);
  const [passwordCaption, setPasswordCaption] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit() {
    if (!validatePassword(password.current)) {
      setPasswordCaption(true);
    } else {
      setPasswordCaption(false);
    }
    if (!validateEmail(email.current)) {
      setEmailCaption(true);
    } else {
      setEmailCaption(false);
    }
    if (validateEmail(email.current) && validatePassword(password.current)) {
      handleLogin();
    }
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await requestLoginAccess(email.current, password.current);
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
      <StatusBar barStyle="light-content" />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      <Title>Welcome to Taqtile!</Title>
      <View style={styles.viewLogin}>
        <Label color={emailCaption ? '#F00' : '#2C0735'}>E-mail</Label>
        <Input
          color={emailCaption ? '#F00' : '#2C0735'}
          autoCapitalize="none"
          onChangeText={(text) => (email.current = text)}
        />
        {emailCaption && (
          <Caption>{`Email "${email.current}" is not valid.`}</Caption>
        )}
        <Label color={passwordCaption ? '#F00' : '#2C0735'}>Senha</Label>
        <Input
          color={passwordCaption ? '#F00' : '#2C0735'}
          onChangeText={(text) => (password.current = text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {passwordCaption && (
          <Caption>
            Password must to have at least one letter and one number
          </Caption>
        )}
      </View>
      <Button onPress={handleSubmit}>
        <Label color={'#FFF'}>Ok</Label>
      </Button>
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
