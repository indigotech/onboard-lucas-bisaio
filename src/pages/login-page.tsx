import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {requestLoginAccess} from '../service/login-request';
import {Navigation} from 'react-native-navigation';
import {styles} from '../styles/login-page-styles';
import {validatePassword, validateEmail} from '../service/validate-input-user';
import {Input} from '../styled-components/text-input-component';
import {Title, Label} from '../styled-components/text-component';

export interface PageProps<T> {
  componentId: string;
  rootTag: number;
  param?: T;
}

const LoginPage = (props: PageProps<void>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (validatePassword(password) && validateEmail(email)) {
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
        <Label>E-mail</Label>
        <Input autoCapitalize="none" onChangeText={setEmail} />
        <Label>Senha</Label>
        <Input
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <Button color="#ff8000" onPress={handleSubmit} title="Entrar" />
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
