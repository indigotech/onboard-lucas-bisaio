import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getData} from './storage-data';
import {token} from './key-names';

export interface QueryResultType<T> {
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
  __typename?: string;
  id?: number;
  birthDate?: string;
  phone: string;
  role?: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  role: string;
}

export interface CreateUser {
  createUser: {
    id: number;
  };
}

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  const currentToken = await getData(token);
  return {
    headers: {
      ...headers,
      Authorization: currentToken ? `${currentToken}` : '',
    },
  };
});
export const client = new ApolloClient({
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

export const queryUserDetail = gql`
  query UserDetails($data: ID!) {
    user(id: $data) {
      name
      email
      birthDate
      phone
      role
    }
  }
`;

export const mutationCreateNewUser = gql`
  mutation createUser($data: UserInputType!) {
    createUser(data: $data) {
      id
    }
  }
`;

export function getUserList(page: number) {
  return client.query<QueryResultType<User>>({
    query: queryUserList,
    variables: {data: {offset: page}},
  });
}
