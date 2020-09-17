import React from 'react';
import {Navigation} from 'react-native-navigation';
import LoginPage from './src/pages/login-page';
import {UserList} from './src/pages/user-list-page';
import {AddUser} from './src/pages/add-user-page';
import {UserDetails} from './src/pages/user-details-page';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/service/users-requests';

Navigation.registerComponent('LoginPage', () => LoginPage);
Navigation.registerComponent('UserList', () => UserList);
Navigation.registerComponent(
  'AddUser',
  () => (props) => (
    <ApolloProvider client={client}>
      <AddUser {...props} />
    </ApolloProvider>
  ),
  () => AddUser,
);
Navigation.registerComponent(
  'UserDetails',
  () => (props) => (
    <ApolloProvider client={client}>
      <UserDetails {...props} />
    </ApolloProvider>
  ),
  () => UserDetails,
);

const loginPage = {
  root: {
    stack: {
      id: 'LoginPage',
      children: [
        {
          component: {
            name: 'LoginPage',
          },
        },
      ],
    },
  },
};

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#FFF',
    },
    topBar: {
      title: {
        color: '#FFF',
      },
      backButton: {
        color: '#FFF',
      },
      background: {color: '#4e148c'},
    },
  });

  Navigation.setRoot(loginPage);
});
