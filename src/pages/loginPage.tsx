/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {loginAccess} from '../service/client';
import {useNavigation} from '@react-navigation/native';

const loginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function onLoading() {
    setLoading(true);
    try {
      const token = await loginAccess(email, password);
      console.warn(token);
      navigation.navigate('HomeScreen');
    } catch (e) {
      Alert.alert('Algo deu errado ' + e);
    } finally {
      setLoading(false);
    }
  }

  function inputValue() {
    if (!passwordTest()) {
      Alert.alert('Incorrect password format');
    } else if (!emailTest()) {
      Alert.alert('Incorrect email format');
    } else {
      onLoading();
    }
  }

  function passwordTest() {
    const emailValidation = /(?=.{7,})(?=.*[0-9])(?=.*[a-z])|(?=.{7,})(?=.*[0-9])(?=.*[A-Z])/;
    return password.length >= 7 && emailValidation.test(password)
      ? true
      : false;
  }
  function emailTest() {
    return email.indexOf('@') && email.indexOf('.com') !== -1 ? true : false;
  }

  return (
    <View style={styles.container}>
      {loading && (
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
      <Button onPress={inputValue} title="Entrar" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000AA',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    paddingBottom: 40,
  },
  viewLogin: {
    alignItems: 'center',
    marginHorizontal: 40,
  },
  textLogin: {
    fontSize: 24,
    paddingTop: 20,
  },
  inputLogin: {
    textAlign: 'center',
    fontSize: 20,
    width: 340,
    height: 50,
    borderWidth: 5,
    borderRadius: 25,
    borderColor: '#CCCC',
  },
});

export default loginPage;
