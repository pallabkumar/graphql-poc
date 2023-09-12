const { RESTDataSource } = require('../../node_modules/apollo-datasource-rest');
const { getIamClientToken } = require('../tokenUtils');
const { DXPCORE_URL } = require('../config');

class VoyageAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DXPCORE_URL;
  }

  async getAllVoyages(pageSize, page) {
    const token = await getIamClientToken();
    const response = await this.get(`voyages?page=${page}&size=${pageSize}`, undefined, {
      headers: {
        'Authorization': `bearer ${token}`,
      }
    });
    const voyageResponse = response['_embedded'] ? response['_embedded'].voyages : [];
    return voyageResponse;
  }
}

module.exports = VoyageAPI;
