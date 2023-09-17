module.exports = {
  Query: {
    voyages: async (_, { pageSize = 20, page = 1 }, { dataSources }) => {
      const allVoyages = await dataSources.voyageAPI.getAllVoyages(pageSize, page);
      return allVoyages;
    },
    getVoyageByNumber: async(_, args, { dataSources }) =>  {
      const allVoyages = await dataSources.voyageAPI.getAllVoyages(99999, 1);
      const data = allVoyages.filter(data => data.number === args.number);
      return data && data.length > 0 ? data[0] : {};
    },
    fetchGuests: async (_, { pageSize = 20, page = 1 }, { dataSources }) => {
      const allGuests = await dataSources.guestAPI.getAllGuests(pageSize, page);
      return allGuests;
    },
  },
};
