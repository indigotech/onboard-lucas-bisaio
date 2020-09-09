import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-community/async-storage';

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

export default async function queryRequest(page: number) {
  const result = await client.query({
    query: gql`
      query User {
        users(pageInfo: {offset: ${page}}) {
          nodes {
            email
            name
            birthDate
            id
          }
        }
      }
    `,
  });
  return result;
}
