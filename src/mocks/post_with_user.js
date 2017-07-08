'use strict';
const userRule = require('./user');
module.exports = {
    'id': '@id',
    'title': '@title(3, 5)',
    'user': Object.assign({}, userRule),
    'domain': '@domain'
};