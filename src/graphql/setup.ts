import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let uri = 'https://rustipe.herokuapp.com/graphql';

if (process.env.REACT_NATIVE_BACKEND_URL) {
  uri = `${process.env.REACT_NATIVE_BACKEND_URL}/graphql`;
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri }),
});

export default undefined;
