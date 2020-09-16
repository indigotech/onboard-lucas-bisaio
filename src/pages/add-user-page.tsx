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

import {Title} from '../styled-components/text-component';
import {ButtonConfirm} from '../components/button-component';
import {Forms} from '../components/forms-component';

export interface CaptionsErrors {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  birthDate?: boolean;
  phone?: boolean;
}

export function AddUser(props: PageProps<void>) {
  const name = useRef<string>('');
  const email = useRef<string>('');
  const birthDate = useRef<string>('');
  const phone = useRef<string>('');
  const password = useRef<string>('');
  const [buttonClicked, setButtonClicked] = useState(0);

  const [addUserRequest, {loading}] = useMutation<NewUser, {data: User}>(
    mutationCreateNewUser,
    {
      onCompleted: (data: User) => backToUserListPage(),
      onError: (error: ApolloError) =>
        Alert.alert(JSON.stringify(error.message)),
    },
  );

  function handleSubmit() {
    setButtonClicked(buttonClicked + 1);
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
        <Forms
          title="Name"
          onChangeText={(text) => (name.current = text)}
          validateField={validateName}
          buttonClicked={buttonClicked}
          message="Is not a valid Name"
        />
        <Forms
          title="E-mail"
          onChangeText={(text) => (email.current = text)}
          validateField={validateEmail}
          buttonClicked={buttonClicked}
          message="Is not a valid E-mail"
        />
        <Forms
          title="Password"
          onChangeText={(text) => (password.current = text)}
          validateField={validatePassword}
          secureTextEntry={true}
          buttonClicked={buttonClicked}
          message="Password have to contain at least one letter and one number."
        />
        <Forms
          title="Birth Date"
          onChangeText={(text) => (birthDate.current = text)}
          validateField={validateBirthDate}
          buttonClicked={buttonClicked}
          message="The correct format is YYYY-MM-DD. And have to be a past date."
        />
        <Forms
          title="Phone Number"
          onChangeText={(text) => (phone.current = text)}
          validateField={validatePhone}
          buttonClicked={buttonClicked}
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
