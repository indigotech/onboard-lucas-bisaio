import React, {useRef, useState} from 'react';
import {Text, View, Alert, ActivityIndicator} from 'react-native';
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
import {PageProps, CaptionsErrors} from './login-page';

import {Input} from '../styled-components/text-input-component';
import {Caption} from '../styled-components/caption-component';
import {Label, Title} from '../styled-components/text-component';
import {Button} from '../styled-components/button-component';

export function AddUser(props: PageProps<void>) {
  const name = useRef<string>('');
  const email = useRef<string>('');
  const birthDate = useRef<string>('');
  const phone = useRef<string>('');
  const password = useRef<string>('');
  const [caption, setCaption] = useState<CaptionsErrors>({
    name: false,
    email: false,
    password: false,
    birthDate: false,
    phone: false,
  });

  const [addUserRequest, {loading}] = useMutation<NewUser, {data: User}>(
    mutationCreateNewUser,
    {
      onCompleted: (data: User) => backToUserListPage(),
      onError: (error: ApolloError) =>
        Alert.alert(JSON.stringify(error.message)),
    },
  );

  function handleSubmit() {
    setCaption({
      name: validateName(name.current),
      email: validateEmail(email.current),
      password: validatePassword(password.current),
      birthDate: validateBirthDate(birthDate.current),
      phone: validatePhone(phone.current),
    });
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

        <Label color={!caption.name ? '#F00' : '#2C0735'}>Name</Label>
        <Input
          color={!caption.name ? '#F00' : '#2C0735'}
          onChangeText={(text) => (name.current = text)}
        />
        {!caption.name && (
          <Caption>{`"${name.current}" is not a valid name.`}</Caption>
        )}
        <Label color={!caption.email ? '#F00' : '#2C0735'}>E-mail</Label>
        <Input
          color={!caption.email ? '#F00' : '#2C0735'}
          onChangeText={(text) => (email.current = text)}
          autoCapitalize="none"
        />
        {!caption.email && (
          <Caption>{`Email "${email.current}" is not valid.`}</Caption>
        )}
        <Label color={!caption.password ? '#F00' : '#2C0735'}>Password</Label>
        <Input
          color={!caption.password ? '#F00' : '#2C0735'}
          secureTextEntry={true}
          onChangeText={(text) => (password.current = text)}
        />
        {!caption.password && (
          <Caption>
            Password have to contain at least one letter and one number.
          </Caption>
        )}
        <Label color={!caption.birthDate ? '#F00' : '#2C0735'}>
          Birth Date
        </Label>
        <Input
          color={!caption.birthDate ? '#F00' : '#2C0735'}
          onChangeText={(text) => (birthDate.current = text)}
        />
        {!caption.birthDate && (
          <Caption>
            {'The correct format is YYYY-MM-DD. And have to be a past date.'}
          </Caption>
        )}
        <Label color={!caption.phone ? '#F00' : '#2C0735'}>Phone Number</Label>
        <Input
          color={!caption.phone ? '#F00' : '#2C0735'}
          onChangeText={(text) => (phone.current = text)}
        />
        {!caption.phone && (
          <Caption>{`Phone "${phone.current}" is not valid. The correct format is 99999999`}</Caption>
        )}
        {loading && (
          <View style={styles.button}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        )}
        {!loading && (
          <Button
            onPress={() => {
              handleSubmit();
            }}>
            <Label color={'#FFF'}>Ok</Label>
          </Button>
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
