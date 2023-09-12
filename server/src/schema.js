const { gql } = require('../node_modules/apollo-server');

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
    ): [Voyages!]
  }

  type VoyageItineraries {
    createdByUser: String
    creationTime: String
    modifiedByUser: String
    modificationTime: String
    voyageItineraryId: String
    voyageId: String
    isSeaDay: Boolean
    itineraryDay: Int
    isDeleted: Boolean
  }

  type Voyages {
    id: ID!
    embarkDate: String
    debarkDate: String
    embarkPortCode: String
    debarkPortCode: String
    isActive: Boolean
    isDeleted: Boolean
    sailingPackageCode: String
    shipCode: String
    isVoyageRollover: Boolean
    boardingMethod: String
    isOCIEnabled: Boolean
    isMOCIEnabled: Boolean
    externalReferenceId: String
    preSaveEnabled: Boolean
    voyageItineraries: [VoyageItineraries]
  }
`;

module.exports = typeDefs;
