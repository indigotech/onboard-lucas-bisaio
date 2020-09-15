import React, {useRef, useState} from 'react';
import {Text, View, Alert, ActivityIndicator} from 'react-native';
import {styles} from '../styles/add-user-page-styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  validateName,
  validateBirthDate,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../service/validate-input-user';

import {Input} from '../styled-components/text-input-component';
import {NewUser, mutationCreateNewUser, User} from '../service/users-requests';
import {ApolloError, useMutation} from '@apollo/client';
import {Navigation} from 'react-native-navigation';
import {PageProps} from './login-page';
import {Caption} from '../styled-componentes/caption-component';
import {Label, Title} from '../styled-componentes/text-component';

export function AddUser(props: PageProps<void>) {
  const name = useRef('');
  const email = useRef('');
  const birthDate = useRef('');
  const phone = useRef('');
  const password = useRef('');
  const [nameCaption, setNameCaption] = useState(false);
  const [emailCaption, setEmailCaption] = useState(false);
  const [passwordCaption, setPasswordCaption] = useState(false);
  const [birthDateCaption, setBirthDateCaption] = useState(false);
  const [phoneCaption, setPhoneCaption] = useState(false);

  const [addUserRequest, {loading}] = useMutation<NewUser, {data: User}>(
    mutationCreateNewUser,
    {
      onCompleted: (data: User) => backToUserListPage(),
      onError: (error: ApolloError) =>
        Alert.alert(JSON.stringify(error.message)),
    },
  );

  function handleSubmit() {
    if (!validateName(name.current)) {
      setNameCaption(true);
    } else {
      setNameCaption(false);
    }
    if (!validateEmail(email.current)) {
      setEmailCaption(true);
    } else {
      setEmailCaption(false);
    }
    if (!validatePassword(password.current)) {
      setPasswordCaption(true);
    } else {
      setPasswordCaption(false);
    }
    if (!validateBirthDate(birthDate.current)) {
      setBirthDateCaption(true);
    } else {
      setBirthDateCaption(false);
    }
    if (!validatePhone(phone.current)) {
      setPhoneCaption(true);
    } else {
      setPhoneCaption(false);
    }

    if (
      validateName(name.current) &&
      validateEmail(email.current) &&
      validatePassword(password.current) &&
      validateBirthDate(birthDate.current) &&
      validatePhone(phone.current)
    ) {
      const newUserInfo: NewUser = {
        email: email.current,
        name: name.current,
        birthDate: birthDate.current,
        phone: phone.current,
        password: password.current,
        role: 'user',
      };
      createNewUserRequest(newUserInfo);
    }
  }

  function createNewUserRequest(newUserInfos: NewUser) {
    addUserRequest({variables: {data: newUserInfos}});
  }

  function backToUserListPage() {
    Navigation.pop(props.componentId);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Title>Add a New User</Title>

        <Label color={nameCaption ? '#F00' : '#2C0735'}>Name</Label>
        <Input
          color={nameCaption ? '#F00' : '#2C0735'}
          onChangeText={(text) => (name.current = text)}
        />
        {nameCaption && (
          <Caption>{`"${name.current}" is not a valid name.`}</Caption>
        )}
        <Label color={emailCaption ? '#F00' : '#2C0735'}>E-mail</Label>
        <Input
          color={emailCaption ? '#F00' : '#2C0735'}
          onChangeText={(text) => (email.current = text)}
          autoCapitalize="none"
        />
        {emailCaption && (
          <Caption>{`Email "${email.current}" is not valid.`}</Caption>
        )}
        <Label color={passwordCaption ? '#F00' : '#2C0735'}>Password</Label>
        <Input
          color={passwordCaption ? '#F00' : '#2C0735'}
          secureTextEntry={true}
          onChangeText={(text) => (password.current = text)}
        />
        {passwordCaption && (
          <Caption>
            Password have to contain at least one letter and one number.
          </Caption>
        )}
        <Label color={birthDateCaption ? '#F00' : '#2C0735'}>Birth Date</Label>
        <Input
          color={birthDateCaption ? '#F00' : '#2C0735'}
          onChangeText={(text) => (birthDate.current = text)}
        />
        {birthDateCaption && (
          <Caption>
            {'The correct format is YYYY-MM-DD. And have to be a past date.'}
          </Caption>
        )}
        <Label color={phoneCaption ? '#F00' : '#2C0735'}>Phone Number</Label>
        <Input
          color={phoneCaption ? '#F00' : '#2C0735'}
          onChangeText={(text) => (phone.current = text)}
        />
        {phoneCaption && (
          <Caption>{`Phone "${phone.current}" is not valid. The correct format is 99999999`}</Caption>
        )}
        {loading && (
          <View style={styles.button}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        )}
        {!loading && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSubmit();
            }}>
            <Text style={styles.textButton}>Ok</Text>
          </TouchableOpacity>
        )}
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
