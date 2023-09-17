require('../node_modules/dotenv').config();

const { ApolloServer } = require('../node_modules/apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('../node_modules/apollo-server-core');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const VoyageAPI = require('./datasources/voyage');
const GuestAPI = require('./datasources/guest');

const { context } = require('./context/graphQLContext');

// set up any dataSources our resolvers need
const dataSources = () => ({
  voyageAPI: new VoyageAPI(),
  guestAPI: new GuestAPI(),
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  apollo: {
    key: process.env.APOLLO_KEY,
  },
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server.listen().then(() => {
    console.log(`Server is running at http://localhost:4000`);
  });
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  VoyageAPI,
  server,
};
