import {ApolloClient, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

export async function loginAccess(email: string, password: string) {
  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });
  const result = await client.mutate({
    mutation: gql`
          mutation {
            login(data: {email: "${email}", password: "${password}"}) {
              token
              user {
                email
                name
                id
                birthDate
                phone
                role
              }
            }
          }
        `,
  });
  await storeData(result.data.login.token);
  const token = await getData();
  return {result, token};
}

//salva o token
const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@token', value);
  } catch (e) {
    console.log('erro na hora de salvar o token: ' + e);
  }
};

//pega o token
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('nao armazenou: ' + e);
  }
};
