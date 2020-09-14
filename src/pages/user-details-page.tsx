import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {styles} from '../styles/user-details-page-styles';
import {useQuery} from '@apollo/client';
import {queryUserDetail, User} from '../service/users-requests';
import {getData} from '../service/storage-data';
import {userId} from '../service/key-names';

export const UserDatails = () => {
  const [currentUserId, setUserId] = useState('');
  const {loading, error, data} = useQuery<{user: User}>(queryUserDetail, {
    variables: {data: currentUserId},
  });

  useEffect(() => {
    async function getUserId() {
      const result = await getData(userId);
      if (result != null) {
        setUserId(result);
      } else {
        Alert.alert('There is no user on system');
      }
    }
    getUserId();
  }, []);

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
            <Text style={styles.infos}>{`E-mail: ${data.user.email}`}</Text>
            <Text style={styles.infos}>{`ID: ${currentUserId}`}</Text>
            <Text style={styles.infos}>{`Phone: ${data.user.phone}`}</Text>
            <Text style={styles.infos}>
              {`Birth Date: ${data.user.birthDate}`}
            </Text>
            <Text style={styles.infos}>{`User type: ${data.user.role}`}</Text>
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
