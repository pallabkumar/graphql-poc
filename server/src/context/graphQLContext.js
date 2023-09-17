const jwt = require('jsonwebtoken');
const { ErrorTypes, throwCustomError } = require('../utils/errorHelper');
const { get, isEmpty } = require('lodash');
const fs = require('fs');
const pubKeyContent = fs.readFileSync(`${__dirname}/pubkey.txt`).toString();;

const context = ({ req }) => {
    const authorization = get(req, 'headers.authorization', '');
    if (isEmpty(authorization)) throwCustomError('Authorization Token Required.', ErrorTypes.BAD_REQUEST);
    try {
        jwt.verify(authorization.split(' ')[1], pubKeyContent);
    } catch (err) {
        throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
    }
};

module.exports = {
    context
};