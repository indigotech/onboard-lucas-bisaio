import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';

const App = () => {
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');

  function inputValue() {
    if (!passwordTest() || !emailTest()) {
      Alert.alert('Incorrect email or password format');
    } else {
      Alert.alert("it's all ok");
    }
  }

  function passwordTest() {
    const regex = /(([a-z]+[A-Z]+|[A-Z]+[a-z]+)|([0-9]+[A-Za-z]+)|([a-zA-Z]+[0-9])+|([\W]))/;
    return password.length >= 7 && regex.test(password) ? true : false;
  }
  function emailTest() {
    return email.indexOf('@') && email.indexOf('.com') !== -1 ? true : false;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo(a) à Taqtile!</Text>
      <View style={styles.viewLogin}>
        <Text style={styles.textLogin}>E-mail</Text>
        <TextInput
          style={styles.inputLogin}
          onChangeText={(text) => setEmail(text)}>
          {email}
        </TextInput>
        <Text style={styles.textLogin}>Senha</Text>
        <TextInput
          style={styles.inputLogin}
          onChangeText={(text) => setPassword(text)}>
          {password}
        </TextInput>
      </View>
      <Button onPress={inputValue} title="Entrar" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    paddingBottom: 40,
  },
  viewLogin: {
    alignItems: 'flex-start',
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

export default App;
