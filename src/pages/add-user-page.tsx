import React, {useRef} from 'react';
import {Text, View, TextInput} from 'react-native';
import {styles} from '../styles/add-user-page-styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  validateName,
  validateBirthDate,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../service/validate-input-user';

export interface newUser {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  role: string;
}

export function AddUser() {
  const name = useRef('');
  const email = useRef('');
  const birthDate = useRef('');
  const phone = useRef('');
  const password = useRef('');

  function handleSubmit() {
    if (
      validateName(name.current) &&
      validateEmail(email.current) &&
      validatePassword(password.current) &&
      validateBirthDate(birthDate.current) &&
      validatePhone(phone.current)
    ) {
      const newUserInfos: newUser = {
        email: email.current,
        name: name.current,
        birthDate: birthDate.current,
        phone: phone.current,
        password: password.current,
        role: 'user',
      };
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New User</Text>
      <View style={styles.infosContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>E-mail</Text>
          <Text style={styles.text}>Password</Text>
          <Text style={styles.text}>Birth Date</Text>
          <Text style={styles.text}>Phone Number</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => (name.current = text)}>
            {name.current}
          </TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => (email.current = text)}
            autoCapitalize="none">
            {email.current}
          </TextInput>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(text) => (password.current = text)}>
            {password.current}
          </TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => (birthDate.current = text)}>
            {birthDate.current}
          </TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => (phone.current = text)}>
            {phone.current}
          </TextInput>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit();
        }}>
        <Text style={styles.textButton}>Ok</Text>
      </TouchableOpacity>
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
