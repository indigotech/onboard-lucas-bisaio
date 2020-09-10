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

export default function getUserList(page: number) {
  return client.query<queryResultType<User>>({
    query: gql`
      query User {
        users(pageInfo: {offset: ${page}}) {
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
    `,
  });
}
