import React, {useRef} from 'react';
import {Text, View, TextInput} from 'react-native';
import {styles} from '../styles/add-user-page-styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  validateName,
  validateBirthDate,
  validateEmail,
  validatePhone,
} from '../service/validate-input-user';
import {User} from '../service/user-list-request';

export function AddUser() {
  const name = useRef('');
  const email = useRef('');
  const birthDate = useRef('');
  const phone = useRef('');

  function handleSubmit() {
    if (
      validateName(name.current) &&
      validateEmail(email.current) &&
      validatePhone(phone.current) &&
      validateBirthDate(birthDate.current)
    ) {
      console.warn('passou');
      const userInfos: User = {
        email: email.current,
        name: name.current,
        birthDate: birthDate.current,
        phone: phone.current,
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
