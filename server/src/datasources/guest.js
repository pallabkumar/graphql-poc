const { RESTDataSource } = require('apollo-datasource-rest');
const { getIamClientToken } = require('../utils/tokenUtils');
const { DXPCORE_URL } = require('../utils/config');

class GuestAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DXPCORE_URL;
  }

  async getAllGuests(pageSize, page) {
    const token = await getIamClientToken();
    const response = await this.get(`guests?page=${page}&size=${pageSize}`, undefined, {
      headers: {
        'Authorization': `bearer ${token}`,
      }
    });
    const guestResponse = response['_embedded'] ? response['_embedded'].guests : [];
    return guestResponse;
  }
}

module.exports = GuestAPI;
