import React from 'react';
import {Text, View, Button} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Users from '../usersList';
import styles from '../styles/homeScreenPageStyles';

interface User {
  email: string;
  name: string;
  __typename?: string;
  id?: number;
  birthDate?: string;
  phone?: string;
  role?: string;
}

export default function HomeScreen() {
  const users: User[] = Users;

  function formatName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function renderListOfUsers(user: User) {
    return (
      <View style={styles.user}>
        <Text style={styles.nameStyle}>{`${formatName(user.name)}`}</Text>
        <Text style={styles.emailStyle}>{`${user.email}`}</Text>
        <Text style={styles.emailStyle}>{`${user.birthDate}`}</Text>
        <Button color="#ff8000" title="Detail" onPress={() => {}} />
      </View>
      //return <Text>{`name: ${user.name} email: ${user.email}`}</Text>;
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={(user) => renderListOfUsers(user.item)}
        keyExtractor={(name, index) => index.toString()}
      />
    </View>
  );
}
