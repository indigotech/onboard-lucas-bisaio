import {Navigation} from 'react-native-navigation';
import LoginPage from './src/pages/login-page';
import HomePage from './src/pages/home-screen-page';
import {AddUser} from './src/pages/add-user-page';

Navigation.registerComponent('LoginPage', () => LoginPage);
Navigation.registerComponent('HomePage', () => HomePage);
Navigation.registerComponent('AddUser', () => AddUser);

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

const addUserPage = {
  root: {
    stack: {
      id: 'AddUser',
      children: [
        {
          component: {
            name: 'AddUser',
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
  //Navigation.setRoot(addUserPage);
});
