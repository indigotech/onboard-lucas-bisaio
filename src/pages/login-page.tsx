import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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
      <Text style={styles.title}>Welcome to Taqtile!</Text>
      <View style={styles.viewLogin}>
        <Text style={styles.textLogin}>E-mail</Text>
        <TextInput
          style={styles.inputLogin}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}>
          {email}
        </TextInput>
        <Text style={styles.textLogin}>Senha</Text>
        <TextInput
          style={styles.inputLogin}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}>
          {password}
        </TextInput>
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
