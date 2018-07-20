'use strict';
module.exports = `
    type Query {
        postSync(pageNo: Int, pageSize: Int): PostList
        postAsyn(pageNo: Int, pageSize: Int): PostList
    }
`;