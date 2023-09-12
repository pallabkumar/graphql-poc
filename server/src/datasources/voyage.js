const { RESTDataSource } = require('apollo-datasource-rest');

class VoyageAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dev.gcpshore.virginvoyages.com/dxpcore/';
  }

  voyageReducer(voyage) {
    return {
        voyageNumber: voyage.voyageNumber,
        voyageName: voyage.voyageName,
        embarkDate: voyage.embarkDate,
        debarkDate: voyage.debarkDate,
        shipCode: voyage.shipCode,
        brandCode: voyage.brandCode,
    };
  }

  async getAllVoyages(pageSize, page) {
    console.log(" +++++ LOAD ALL VOYAGES +++++++ ")
    const response = await this.post(`voyages/search/upcomingvoyagesandships?page=${page}&size=${pageSize}`, {}, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55aWQiOiJiMzVhMzI1YS0wMzZhLTRhZDQtODgzNi02NDY5MjNlNjAxZGUiLCJzY29wZSI6WyJyZWFkIiwidHJ1c3QiLCJ3cml0ZSJdLCJleHAiOjE2OTQ0MzU2NTQsInRva2VuVHlwZSI6ImNsaWVudFRva2VuIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9UUlVTVEVEX0NMSUVOVCJdLCJqdGkiOiI2NTMxYjA3MC1mYTNkLTQ0ZGQtYWYxYS01ZjQxMTE0NTJmNTciLCJjbGllbnRfaWQiOiI2YzdmMTVlZS0xZGVjLTQ3NGYtYWEyYS1mMjUyNjg4ODZlN2MifQ.uvLqCPFLbF9YunRfXacD_Hw3S9hmre-yhu515kzVT-P34m4dBnhE9A2lK7V5BQr_yJwOk4gBnTSDrjDNdFDfkhKtt1KPUihtQM5cMZIYgeFYtbNVhR9MY1TF_gvNhsZZc16QJi7PSc5Ae-ymOiOmaEtX9KMYlHYZQ-yl7zRdLm4KCiZ876DCcV2ufO8gJG_8DvK9xUWFwpZ0EjCejdgxYBPmke0gScnxuiE5ynINJWU41ir8bEF0B-GFqR98S9Jof-ypSLBrclHhOTJsL237uNHXFR-A2DkZrz4ZDNCWBfHHK-c37GYTvUxYW4WiHzrBIYFIUH83nfIj1BFLcYR2PA',
      }
    });
    const voyageResponse = response['_embedded'] ? response['_embedded'].shipDetails : [];
    return Array.isArray(voyageResponse) ? voyageResponse.map(voyage => this.voyageReducer(voyage)) : [];
  }
}

module.exports = VoyageAPI;
