'use strict';
const Mock = require('mockjs');
const mock = Mock.mock;
const mockRules = require('../mocks/');
const postWithUser = mockRules.postWithUser;
const post = mockRules.post;
const getUserList = mockRules.getUserList;
module.exports = {
    /**
     * @see https://github.com/graphql/graphql-js/blob/master/src/execution/execute.js#L137
     */
    getPostSync: function({pageNo = 1, pageSize = 10}) {
        const pageInfo = reBuildPageInfo(pageNo, pageSize);
        const curPageSize = random(1, pageInfo.pageSize);
        const total = (pageNo - 1) * pageInfo.pageSize + curPageSize;
        let mockRule = {
            pageNo: pageInfo.pageNo,
            pageSize: pageInfo.pageSize,
            total
        };
        mockRule['data' + (curPageSize === 1 ? '' : ('|' + curPageSize))] = [postWithUser];
        console.log('---Mock Rule---');
        console.log(JSON.stringify(mockRule));
        return mock(mockRule);
    },
    getPostAsyn: function({pageNo = 1, pageSize = 10}) {
        const pageInfo = reBuildPageInfo(pageNo, pageSize);
        const curPageSize = random(1, pageInfo.pageSize);
        const total = (pageNo - 1) * pageInfo.pageSize + curPageSize;
        let mockRule = {
            pageNo: pageInfo.pageNo,
            pageSize: pageInfo.pageSize,
            total
        };
        mockRule['data' + (curPageSize === 1 ? '' : ('|' + curPageSize))] = [post];
        console.log('---Mock Rule---');
        console.log(JSON.stringify(mockRule));
        return Promise.resolve(mock(mockRule))
        .then(function(data) {
            return new Promise(function(resolve) {
                const userData = mock(getUserList(data.data.length, pageInfo.pageSize));
                let userDataObj = {};
                userData.data.forEach(function(user) {
                    userDataObj[user.id] = Object.assign({}, user);
                });
                const postList = data.data.map(function(post) {
                    return Object.assign({}, post, {
                        user: userDataObj[post.userId]
                    });
                });
                resolve(Object.assign({}, data, {
                    data: postList
                }));
            });
        });
    }
};

function random (min, max) {
    return Math.floor(min + Math.random() * ((max + 1) - min ));
}

function reBuildPageInfo(pageNo, pageSize) {
    if(pageNo <= 0 || !/^\d+$/.test(pageNo)) {
        pageNo = 1;
    }
    if(pageSize <= 0 || !/^\d+$/.test(pageSize)) {
        pageSize = 10;
    }
    return {
        pageNo,
        pageSize
    };
}