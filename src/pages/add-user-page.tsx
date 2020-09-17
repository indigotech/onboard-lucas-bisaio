import React, {useRef, useState} from 'react';
import {View, Alert, ActivityIndicator} from 'react-native';
import {styles} from '../styles/add-user-page-styles';

import {
  validateName,
  validateBirthDate,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../service/validate-input-user';

import {NewUser, mutationCreateNewUser, User} from '../service/users-requests';
import {ApolloError, useMutation} from '@apollo/client';
import {Navigation} from 'react-native-navigation';
import {PageProps} from './login-page';
import {InputState} from './login-page';

import {Title} from '../styled-components/text-component';
import {ButtonConfirm} from '../components/button-component';
import {Forms} from '../components/forms-component';

export function AddUser(props: PageProps<void>) {
  const name = useRef<InputState>({text: '', isValid: false});
  const email = useRef<InputState>({text: '', isValid: false});
  const birthDate = useRef<InputState>({text: '', isValid: false});
  const phone = useRef<InputState>({text: '', isValid: false});
  const password = useRef<InputState>({text: '', isValid: false});
  const [buttonClicked, setButtonClicked] = useState(false);

  const [addUserRequest, {loading}] = useMutation<NewUser, {data: User}>(
    mutationCreateNewUser,
    {
      onCompleted: (data: User) => backToUserListPage(),
      onError: (error: ApolloError) =>
        Alert.alert(JSON.stringify(error.message)),
    },
  );

  function handleSubmit() {
    setButtonClicked(true);
    if (
      name.current.isValid &&
      email.current.isValid &&
      password.current.isValid &&
      birthDate.current.isValid &&
      phone.current.isValid
    ) {
      const newUserInfo: NewUser = {
        email: email.current.text,
        name: name.current.text,
        birthDate: birthDate.current.text,
        phone: phone.current.text,
        password: password.current.text,
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
        <Forms
          title="Name"
          onChangeText={(value) => (name.current = value)}
          validateField={validateName}
          readyToValidate={buttonClicked}
          message="Is not a valid Name"
        />
        <Forms
          title="E-mail"
          onChangeText={(value) => (email.current = value)}
          validateField={validateEmail}
          readyToValidate={buttonClicked}
          message="Is not a valid E-mail"
        />
        <Forms
          title="Password"
          onChangeText={(value) => (password.current = value)}
          validateField={validatePassword}
          secureTextEntry={true}
          readyToValidate={buttonClicked}
          message="Password have to contain at least one letter and one number."
        />
        <Forms
          title="Birth Date"
          onChangeText={(value) => (birthDate.current = value)}
          validateField={validateBirthDate}
          readyToValidate={buttonClicked}
          message="The correct format is YYYY-MM-DD. And have to be a past date."
        />
        <Forms
          title="Phone Number"
          onChangeText={(value) => (phone.current = value)}
          validateField={validatePhone}
          readyToValidate={buttonClicked}
          message="Phone is not valid. The correct format is 99999999"
        />
        {loading && (
          <View style={styles.button}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        )}
        {!loading && <ButtonConfirm onPress={handleSubmit} title="Ok" />}
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
