import React from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {styles} from '../styles/user-details-page-styles';
import {PageProps} from './login-page';
import {useQuery} from '@apollo/client';
import {queryUserDetail, User} from '../service/users-requests';

const fakeId = '75';

export const UserDatails = (props: PageProps) => {
  const userId = props.data !== undefined ? props.data : fakeId;
  const {loading, error, data} = useQuery<{user: User}>(queryUserDetail, {
    variables: {data: userId},
  });

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {!loading && error === undefined && (
        <>
          <View style={styles.datails}>
            <Text style={styles.name}>{data.user.name}</Text>
          </View>
          <View style={styles.datails}>
            <Text style={styles.name}>{`User E-mail: ${data.user.email}`}</Text>
            <Text style={styles.name}>{`User ID: ${userId}`}</Text>
            <Text style={styles.name}>{`User Phone: ${data.user.phone}`}</Text>
            <Text style={styles.name}>
              {`User Birth Date: ${data.user.birthDate}`}
            </Text>
          </View>
        </>
      )}
      {!loading &&
        error !== undefined &&
        Alert.alert(`${error.message}. Try again in a few minutes.`, '', [], {
          cancelable: false,
        })}
    </View>
  );
};

UserDatails.options = {
  topBar: {
    title: {
      text: 'User Datails',
    },
  },
};
