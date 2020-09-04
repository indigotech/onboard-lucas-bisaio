import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';

function loginAccess (email: string, password: string) {
  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });
  console.log(email, password);
  client
    .mutate({
      mutation: gql`
        mutation {
          login(data: {email: "${email}", password: "${password}"}) {
            token
          }
        }
      `,
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function inputValue() {
    if (!passwordTest()) {
      Alert.alert('Incorrect password format');
    } else if (!emailTest()) {
      Alert.alert('Incorrect email format');
    } else {
      Alert.alert("it's all ok");
      loginAccess(email, password);
    }
  }

  function passwordTest() {
    const emailValidation = /(?=.{7,})(?=.*[0-9])(?=.*[a-z])|(?=.{7,})(?=.*[0-9])(?=.*[A-Z])/;
    return password.length >= 7 && emailValidation.test(password) ? true : false;
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
