import React, {useState, useEffect} from 'react';
import {Text, View, Button, Alert, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../styles/home-screen-page-styles';
import getUserList from '../service/user-list-request';
import {PageProps} from './login-page';

interface User {
  email: string;
  name: string;
  __typename: string;
  id: number;
  birthDate: string;
  phone: string;
  role?: string;
}

export default function HomeScreen(props: PageProps) {
  const [page, setPage] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateUsersList();
  }, []);

  function formatName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function renderUser(user: User) {
    return (
      <View style={styles.user}>
        <Text style={styles.nameStyle}>{`${formatName(user.name)}`}</Text>
        <Text style={styles.emailStyle}>{`${user.email}`}</Text>
        <Text style={styles.emailStyle}>{`${user.birthDate}`}</Text>
        <Button color="#ff8000" title="Detail" onPress={() => {}} />
      </View>
    );
  }

  async function updateUsersList(): Promise<void> {
    setLoading(true);
    try {
      const newUsersList = (await getUserList(page)).data.users.nodes;
      setUsersList([...usersList, ...newUsersList]);
      setPage(page + 10);
    } catch (e) {
      Alert.alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      <FlatList
        data={usersList}
        renderItem={(user) => renderUser(user.item)}
        keyExtractor={(name: User) => name.id.toString()}
        onEndReached={updateUsersList}
        onEndReachedThreshold={0.6}
      />
    </View>
  );
}

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Users List',
    },
  },
};
