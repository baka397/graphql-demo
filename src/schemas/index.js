'use strict';
const User = require('./user');
const Post = require('./post');
const Query = require('./query');

function combine(schemas) {
    let schemaString = '';
    Object.keys(schemas).forEach(function(key) {
        schemaString += schemas[key];
    });
    return schemaString;
}

module.exports = combine({
    User,
    Post,
    Query
});