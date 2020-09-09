import React, {useState} from 'react';
import {Text, View, TextInput, Alert} from 'react-native';
import {styles} from '../styles/add-user-page-styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  validateName,
  validateBirthDate,
  validateEmail,
  validateCpf,
  validatePhone,
} from '../service/validate-input-user';
import {User} from '../service/user-list-request';

export function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('(+55) 11 9');
  const [cpf, setCPF] = useState('');

  function handleSubmit() {
    if (!validateName(name)) {
      Alert.alert(`Incorrect input. "${name}" is not a valid name. Try again.`);
    } else if (!validateCpf(cpf)) {
      Alert.alert(
        `Incorrect input. CPF "${cpf}" is not valid. Try again without dots and hyphen.`,
      );
    } else if (!validateEmail(email)) {
      Alert.alert(`Incorrect input. Email "${email}" is not valid. Try again.`);
    } else if (!validatePhone) {
      Alert.alert(
        `Incorrect input. Phone "${phone}" is not valid. Try with hyphen.`,
      );
    } else if (!validateBirthDate(birthDate)) {
      Alert.alert(
        `Incorrect input. Birth date "${birthDate}" is not valid. Try again.`,
      );
    } else {
      const userInfos: User = {
        email: email,
        name: name,
        birthDate: birthDate,
        phone: phone,
        cpf: cpf,
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
          <Text style={styles.text}>CPF</Text>
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
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPhone(text)}>
            {phone}
          </TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setCPF(text)}>
            {cpf}
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
