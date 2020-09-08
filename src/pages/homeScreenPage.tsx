import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Users from '../usersList';

interface User {
  email: string;
  name: string;
  __typename?: string;
  id?: number;
  birthDate?: string;
  phone?: string;
  role?: string;
}

export default function HomeScreen({route}) {
  const userInfo: User = route.params;
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

  console.log(userInfo);
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={(user) => renderListOfUsers(user.item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    padding: 12,
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: 300,
    height: 120,
    margin: 12,
    borderRadius: 20,
    padding: 12,
  },
  nameStyle: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  emailStyle: {
    textAlign: 'center',
  },
  button: {
    color: 'orange',
  },
});
