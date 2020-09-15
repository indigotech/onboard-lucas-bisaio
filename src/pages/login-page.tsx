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

import {Input} from '../styled-components/text-input-component';
import {Title, Label} from '../styled-components/text-component';
import {Button} from '../styled-components/button-component';
import {Caption} from '../styled-components/caption-component';

export interface PageProps<T> {
  componentId: string;
  rootTag: number;
  param?: T;
}

export interface CaptionsErrors {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  birthDate?: boolean;
  phone?: boolean;
}

const LoginPage = (props: PageProps<void>) => {
  const email = useRef<string>('');
  const password = useRef<string>('');
  const [caption, setCaption] = useState<CaptionsErrors>({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit() {
    setCaption({
      email: validateEmail(email.current),
      password: validatePassword(password.current),
    });
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
        <Label color={!caption.email ? '#F00' : '#2C0735'}>E-mail</Label>
        <Input
          color={!caption.email ? '#F00' : '#2C0735'}
          autoCapitalize="none"
          onChangeText={(text) => (email.current = text)}
        />
        {!caption.email && (
          <Caption>{`Email "${email.current}" is not valid.`}</Caption>
        )}
        <Label color={!caption.password ? '#F00' : '#2C0735'}>Senha</Label>
        <Input
          color={!caption.password ? '#F00' : '#2C0735'}
          onChangeText={(text) => (password.current = text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {!caption.password && (
          <Caption>
            Password must to have at least one letter and one number
          </Caption>
        )}
      </View>
      <Button onPress={() => handleSubmit()}>
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
