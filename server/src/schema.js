const { gql } = require('../node_modules_pk/apollo-server');

const typeDefs = gql`
  type Query {
    voyages(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      page: Int
    ): Voyages!
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type Voyages {
    voyages: [Voyage]!
  }

  type Voyage {
    id: ID!
    voyageNumber: String!
    voyageName: String!
    embarkDate: String!
    debarkDate: String!
    shipCode: String!
    brandCode: String
  }
`;

module.exports = typeDefs;
