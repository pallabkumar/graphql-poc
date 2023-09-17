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

    getVoyageByNumber(number: String!) : Voyages!
    fetchGuests( 
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      page: Int
    ): [Guests!]
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
    number: String
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

  type Addresses {
  createdByUser: String
  creationTime: String
  modifiedByUser: String
  modificationTime: String
  addressId: String
  line1: String
  line2: String
  city: String
  state: String
  countryCode: String
  zip: String
  isDeleted: Boolean
  guestId: String
  addressTypeCode: String
}

type Phones {
  createdByUser: String
  creationTime: String
  modifiedByUser: String
  modificationTime: String
  phoneId: String
  guestId: String
  phoneTypeCode: String
  number: String
  countryTelephoneCode: String
  isDeleted: Boolean
}

type Guests {
  createdByUser: String
  creationTime: String
  modifiedByUser: String
  modificationTime: String
  guestId: String
  firstName: String
  lastName: String
  birthDate: String
  genderCode: String
  email: String
  citizenshipCountryCode: String
  guestUniqueId: String
  isDeleted: Boolean
  preSaveEnabled: Boolean
  contactType: String
  kafkaEvent: Boolean
  greetingDetails: [String]
  addresses: [Addresses]
  guestMediaItems: [String]
  phones: [Phones]
  identifications: [String]
  visas: [String]
}
`;

module.exports = typeDefs;
