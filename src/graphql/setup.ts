import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError, ErrorResponse } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage';

import { AUTH_TOKEN_NAME, USER_ID_NAME } from '../modules/user/constants';
import { navigate } from '../rootNavigation';

let uri = 'https://rustipe.herokuapp.com/graphql';

if (process.env.REACT_NATIVE_BACKEND_URL) {
  uri = `${process.env.REACT_NATIVE_BACKEND_URL}/graphql`;
}

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_NAME);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const resetAuth = onError(({ graphQLErrors }: ErrorResponse) => {
  if (
    graphQLErrors &&
    graphQLErrors[0] &&
    ['User must logged', 'User not found'].includes(graphQLErrors[0].message)
  ) {
    AsyncStorage.removeItem(AUTH_TOKEN_NAME);
    AsyncStorage.removeItem(USER_ID_NAME);
    navigate('Signin', { redirect: null });
  }
});

export const client = new ApolloClient({
  link: authLink.concat(resetAuth).concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          recipe(_, { args, toReference }) {
            return toReference({
              __typename: 'Recipe',
              id: args?.id,
            });
          },
        },
      },
    },
  }),
});

export default undefined;
