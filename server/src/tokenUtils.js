const axios = require("axios");
const { CLIENT_ID, CLIENT_SECRET, IAM_SERVICE_URL } = require("./Config");
const NodeCache = require('node-cache');
const { get } = require('lodash');

const basicToken = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;
const memCache = new NodeCache();

const getIamClientToken = async () => {
    if (memCache.get('token')) return memCache.get('token');
    return axios({
      method: 'post',
      baseURL: IAM_SERVICE_URL,
      headers: {
          "Content-Type": "application/json",
          "Authorization": basicToken
      },
      url: '/oauth/token?grant_type=client_credentials'
    })
    .then(res => {
        if (res.status === 200) {
            memCache.set('token', get(res.data, 'access_token'), 10000000);
            return memCache.get('token');
        }
    })
    .catch(err => {
      throw err;
    })
};

module.exports = {
    getIamClientToken,
}