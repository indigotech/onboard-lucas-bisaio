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
import {loginAccess} from '../service/mutate-request';
import {Navigation} from 'react-native-navigation';
import styles from '../styles/login-page-styles';
import queryRequest from '../service/query-request';

interface PageProps {
  componentId: string;
  rootTag: number;
}

interface User {
  email: string;
  name: string;
  __typename?: string;
  id?: number;
  birthDate?: string;
  phone?: string;
  role?: string;
}

const LoginPage = (props: PageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onloading, setLoading] = useState(false);

  function inputValue() {
    if (!passwordTest()) {
      Alert.alert('Incorrect password format');
    } else if (!emailTest()) {
      Alert.alert('Incorrect email format');
    } else {
      handleLoading();
    }
  }

  function passwordTest() {
    const passwordValidation = /(?=.{7,})(?=.*[0-9])(?=.*[a-z])|(?=.{7,})(?=.*[0-9])(?=.*[A-Z])/;
    return passwordValidation.test(password) ? true : false;
  }

  function emailTest() {
    return email.indexOf('@') && email.indexOf('.com') !== -1 ? true : false;
  }

  async function handleLoading() {
    setLoading(true);
    try {
      await loginAccess(email, password);
      const startPage = 0;
      const userList = await queryRequest(startPage);
      nextPage(userList.data.users.nodes);
    } catch (e) {
      Alert.alert('Something is wrong - ' + e);
    } finally {
      setLoading(false);
    }
  }

  function nextPage(userList: User[]) {
    Navigation.push(props.componentId, {
      component: {
        name: 'HomePage',
        passProps: {
          users: {userList},
        },
      },
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {onloading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Carregando</Text>
        </View>
      )}
      <Text style={styles.title}>Bem vindo(a) à Taqtile!</Text>
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
      <Button color="#ff8000" onPress={inputValue} title="Entrar" />
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
