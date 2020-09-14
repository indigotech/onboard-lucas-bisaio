import {ApolloClient, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import {User} from './user-list-request';

export interface MutateResultType<T> {
  login: {
    token: string;
    user: T;
  };
}

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export const mutate = gql`
  mutation Login($data: LoginInputType!) {
    login(data: $data) {
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
`;

export async function requestLoginAccess(
  email: string,
  password: string,
): Promise<void> {
  const result = await client.mutate<MutateResultType<User>>({
    mutation: mutate,
    variables: {data: {email, password}},
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
