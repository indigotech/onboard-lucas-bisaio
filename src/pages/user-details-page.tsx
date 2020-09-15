import React from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {styles} from '../styles/user-details-page-styles';
import {useQuery} from '@apollo/client';
import {queryUserDetail, User} from '../service/users-requests';
import {PageProps} from './login-page';

export function UserDetails<React, FC>(props: PageProps<string>) {
  const userId = props.param;
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
      {!loading && !error && (
        <>
          <View style={styles.datails}>
            <Text style={styles.name}>{data.user.name}</Text>
          </View>
          <View style={styles.datails}>
            <Text style={styles.infos}>{`E-mail: ${data.user.email}`}</Text>
            <Text style={styles.infos}>{`ID: ${userId}`}</Text>
            <Text style={styles.infos}>{`Phone: ${data.user.phone}`}</Text>
            <Text style={styles.infos}>
              {`Birth Date: ${data.user.birthDate}`}
            </Text>
            <Text style={styles.infos}>{`Role type: ${data.user.role}`}</Text>
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
}

UserDetails.options = {
  topBar: {
    title: {
      text: 'User Details',
    },
  },
};
