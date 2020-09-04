import {ApolloClient, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export function loginAccess(email: string, password: string) {
  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });
  client
    .mutate({
      mutation: gql`
        mutation {
          login(data: {email: "${email}", password: "${password}"}) {
            token
          }
        }
      `,
    })
    .then((result) => {
      storeData(result.data.login.token);
      getData();
    })
    .catch((error) => {
      Alert.alert(
        'Credenciais inválidas. Por favor, verifique seu e-mail e senha.',
      );
      console.log(error);
    });
}

//salva o token
const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    console.log('erro na hora de salvar o token:' + e);
  }
};

//pega o token
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      console.warn(value);
    }
  } catch (e) {
    console.log('nao armazenou:' + e);
  }
};
