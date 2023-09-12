module.exports = {
  Query: {
    voyages: async (_, { pageSize = 20, page = 1 }, { dataSources }) => {
      const allVoyages = await dataSources.voyageAPI.getAllVoyages(pageSize, page);
      return {
        voyages: allVoyages
      }
    }
  },
};
