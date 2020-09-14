import React, {useState, useRef, useEffect} from 'react';
import {Text, View, Alert, Button} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../styles/home-screen-page-styles';
import {getUserList, User} from '../service/users-requests';
import {Navigation} from 'react-native-navigation';
import {PageProps} from './login-page';
import {storeData} from '../service/storage-data';
import {userId} from '../service/key-names';

export default function HomeScreen(props: PageProps) {
  const offset = useRef(0);
  const hasNextPage = useRef(true);
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    updateUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderUser(user: User) {
    return (
      <View style={styles.user}>
        <Text style={styles.nameStyle}>{`${user.name}`}</Text>
        <Text style={styles.emailStyle}>{`${user.email}`}</Text>
        <Button
          title="Details"
          onPress={() => handleButton(user.id.toString())}
          color="#ff8000"
        />
      </View>
    );
  }

  async function handleButton(id: string) {
    await storeData(userId, id);
    goToUserDetailsPage();
  }

  function goToUserDetailsPage() {
    Navigation.push(props.componentId, {
      component: {
        name: 'UserDetails',
      },
    });
  }

  async function updateUsersList(): Promise<void> {
    try {
      if (hasNextPage.current) {
        const queryResult = (await getUserList(offset.current)).data;
        const newUsersList = queryResult.users.nodes;
        setUsersList([...usersList, ...newUsersList]);
        offset.current += 10;
        hasNextPage.current = queryResult.users.pageInfo.hasNextPage;
      }
    } catch (e) {
      Alert.alert(e);
    }
  }

  function goToAddUserPage() {
    Navigation.push(props.componentId, {
      component: {
        name: 'AddUser',
      },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatList}>
        <FlatList
          data={usersList}
          renderItem={(user) => renderUser(user.item)}
          keyExtractor={(name: User) => name.id.toString()}
          onEndReached={updateUsersList}
          onEndReachedThreshold={0.6}
        />
      </View>
      <View style={styles.touchbleOpacityContainer}>
        <TouchableOpacity
          style={styles.touchbleOpacity}
          onPress={() => {
            goToAddUserPage();
          }}>
          <Text style={styles.touchbleOpacityText}>+</Text>
        </TouchableOpacity>
      </View>
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
