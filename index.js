import React from 'react';
import {Navigation} from 'react-native-navigation';
import LoginPage from './src/pages/login-page';
import HomePage from './src/pages/user-list-page';
import {AddUser} from './src/pages/add-user-page';
import {UserDatails} from './src/pages/user-details-page';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/service/users-requests';

Navigation.registerComponent('LoginPage', () => LoginPage);
Navigation.registerComponent('HomePage', () => HomePage);
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
      <UserDatails {...props} />
    </ApolloProvider>
  ),
  () => UserDatails,
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
      backgroundColor: '#ff8000',
    },
    topBar: {
      title: {
        color: '#FFF',
      },
      backButton: {
        color: '#FFF',
      },
      background: {color: '#ff8000'},
    },
  });

  Navigation.setRoot(loginPage);
});
