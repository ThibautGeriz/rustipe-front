import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError, ErrorResponse } from '@apollo/client/link/error';
import { AsyncStorage } from 'react-native';

import { AUTH_TOKEN_NAME } from '../modules/user/constants';
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
  if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].message === 'User must logged') {
    AsyncStorage.removeItem(AUTH_TOKEN_NAME);
    navigate('Signin', {});
  }
});

export const client = new ApolloClient({
  link: authLink.concat(resetAuth).concat(httpLink),
  cache: new InMemoryCache(),
});

export default undefined;
