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

import {Title} from '../styled-components/text-component';
import {ButtonConfirm} from '../components/button-component';
import {Forms} from '../components/forms-component';

export interface PageProps<T> {
  componentId: string;
  rootTag: number;
  param?: T;
}

const LoginPage = (props: PageProps<void>) => {
  const email = useRef<string>('');
  const password = useRef<string>('');
  const [buttonClicked, setButtonClicked] = useState(0);
  const [validation, setValidation] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit() {
    setButtonClicked(buttonClicked + 1);
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
        <Forms
          title="Email"
          onChangeText={(text) => (email.current = text)}
          validateField={validateEmail}
          buttonClicked={buttonClicked}
          message="Email not valid"
        />
        <Forms
          title="Password"
          onChangeText={(text) => (password.current = text)}
          secureTextEntry={true}
          validateField={validatePassword}
          buttonClicked={buttonClicked}
          message="Password must to have at least one letter and one number"
        />
      </View>
      <ButtonConfirm onPress={handleSubmit} title="Ok" />
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
