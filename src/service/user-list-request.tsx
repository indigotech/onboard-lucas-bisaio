import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-community/async-storage';

export interface queryResultType<T> {
  users: {
    nodes: T[];
    pageInfo: {
      hasNextPage: boolean;
    };
  };
}

export interface User {
  email: string;
  name: string;
  __typename: string;
  id: number;
  birthDate: string;
  phone: string;
  role?: string;
}

export interface newUser {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  role: string;
}

export interface createUser {
  createUser: {
    id: number;
  };
}

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('@token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const queryUserList = gql`
  query UserList($data: PageInputType) {
    users(pageInfo: $data) {
      nodes {
        email
        name
        birthDate
        id
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const mutationCreateNewUser = gql`
  mutation createUser($data: PageInputType) {
    createUser(data: $data) {
      id
    }
  }
`;

export function getUserList(page: number) {
  return client.query<queryResultType<User>>({
    query: queryUserList,
    variables: {data: {offset: page}},
  });
}

export function createNewUser(data: newUser) {
  return client.mutate<newUser>({
    mutation: mutationCreateNewUser,
    variables: {data: data},
  });
}
