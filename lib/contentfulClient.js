import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://graphql.contentful.com/content/v1/spaces/ntjp93sly67d',
  headers: {
    Authorization: 'Bearer SUzO0zITs9bYRCgtvYO5yjv040vspQwGhynjU1LXZOg',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
