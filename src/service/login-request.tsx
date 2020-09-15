import {ApolloClient, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import {User} from './users-requests';
import {storeData} from './storage-data';
import {token} from './key-names';

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
  await storeData(token, result.data.login.token);
}
