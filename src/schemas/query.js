'use strict';
module.exports = `
    type Query {
        getPostSync(pageNo: Int, pageSize: Int): PostList
        getPostAsyn(pageNo: Int, pageSize: Int): PostList
    }
`;