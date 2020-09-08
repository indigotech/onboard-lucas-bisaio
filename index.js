import {Navigation} from 'react-native-navigation';
import LoginPage from './src/pages/loginPage';
import HomePage from './src/pages/homeScreenPage';

Navigation.registerComponent('LoginPage', () => LoginPage);
Navigation.registerComponent('HomePage', () => HomePage);

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

LoginPage.options = {
  topBar: {
    title: {
      text: 'Login Page',
    },
  },
};

HomePage.options = {
  topBar: {
    title: {
      text: 'Users List',
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
