import {Navigation} from 'react-native-navigation';
import LoginPage from './src/pages/login-page';
import HomePage from './src/pages/home-screen-page';

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
