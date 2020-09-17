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
export interface InputState {
  text: string;
  isValid: boolean;
}

const LoginPage = (props: PageProps<void>) => {
  const email = useRef<InputState>({text: '', isValid: false});
  const password = useRef<InputState>({text: '', isValid: false});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit() {
    setButtonClicked(true);
    if (email.current.isValid && password.current.isValid) {
      handleLogin();
    }
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await requestLoginAccess(email.current.text, password.current.text);
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
          onChangeText={(value: InputState) => (email.current = value)}
          validateField={validateEmail}
          readyToValidate={buttonClicked}
          message="Email not valid"
        />
        <Forms
          title="Password"
          onChangeText={(value: InputState) => (password.current = value)}
          secureTextEntry={true}
          validateField={validatePassword}
          readyToValidate={buttonClicked}
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
