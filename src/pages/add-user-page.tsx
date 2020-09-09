import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import styles from '../styles/add-user-page-styles';

export function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New User</Text>
      <View style={styles.infosContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>E-mail</Text>
          <Text style={styles.text}>Birth Date</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setName(text)}>
            {name}
          </TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}>
            {email}
          </TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setBirthDate(text)}>
            {birthDate}
          </TextInput>
        </View>
      </View>
    </View>
  );
}

AddUser.options = {
  topBar: {
    title: {
      text: 'New User Page',
    },
  },
};
