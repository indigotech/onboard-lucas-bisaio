import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../styles/home-screen-page-styles';
import queryRequest from '../service/query-request';

interface User {
  email: string;
  name: string;
  __typename: string;
  id?: number;
  birthDate?: string;
  phone?: string;
  role?: string;
}

interface PageProps {
  componentId: string;
  rootTag: number;
  users: object;
}

export default function HomeScreen(props: PageProps) {
  let [page, setPage] = useState(10);
  const [usersList, setUsersList] = useState(props.users.userList);

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

  async function updateUsersList() {
    const newUsersList = (await queryRequest(page)).data.users.nodes;
    setUsersList([...usersList, ...newUsersList]);
    setPage((page += 10));
  }

  return (
    <View style={styles.container}>
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
