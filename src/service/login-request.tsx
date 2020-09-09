import {ApolloClient, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export async function requestLoginAccess(
  email: string,
  password: string,
): Promise<void> {
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
}

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@token', value);
  } catch (e) {
    console.log('erro na hora de salvar o token: ' + e);
  }
};
