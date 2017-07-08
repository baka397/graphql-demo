'use strict';
const userRule = require('./user');
module.exports = function(endId, pageSize) {
    let rule = {
        page: 1,
        pageSize: pageSize,
        total: endId
    };
    rule['data' + (endId === 1 ? '' : ('|' + endId))] = [Object.assign({}, userRule)];
    return rule;
};