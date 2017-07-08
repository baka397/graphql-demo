'use strict';
module.exports =  `
    type Post {
        id: ID!
        title: String!
        user: User
        domain: String!
    }
    type PostList {
        pageNo: Int
        pageSize: Int
        total: Int
        data: [Post]
    }
`;