/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,
} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.title}>
          <Text style={styles.text}>Bem vindo(a) à Taqtile!</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.descriptionText}>E-mail</Text>
            <TextInput style={styles.input}> </TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.descriptionText}> Senha</Text>
            <TextInput style={styles.input}> </TextInput>
          </View>
          <Button onPress={() => Alert.alert('pressed')} title="Entrar" />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
  },
  title: {
    backgroundColor: 'white',
    paddingTop: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    textAlign: 'center',
    width: 350,
    height: 70,
    fontSize: 24,
    borderWidth: 3,
    borderRadius: 25,
    borderColor: '#a6a6a6',
  },
  descriptionText: {
    fontSize: 20,
    padding: 9,
  },
});

export default App;
