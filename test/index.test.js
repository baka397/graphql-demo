'use strict';
const Graphql = require('graphql');
const graphql = Graphql.graphql;
const buildSchema = Graphql.buildSchema;
const Schema = require('../src/schemas/');
const querys = require('../src/queries/');
const assert = require('power-assert');

const schema = buildSchema(Schema);
const root = Object.assign({}, querys);
describe('Query', function() {
    it('Query post Sync', function(done) {
        graphql(schema, `
{
    result: getPostSync(pageNo: 2) {
        pageNo
        pageSize
        total
        data {
            title
            domain
            user {
                nickName
            }
        }
    }
}
        `, root).then(function(data) {
            console.log(data);
            assert(data.data.result.total > 10);
            assert(data.data.result.total <= 20);
            done();
        })
        .catch(function(err) {
            done(err);
        });
    });

    it('Query post Asyn', function(done) {
        graphql(schema, `
{
    result: getPostAsyn(pageNo: 2) {
        pageNo
        pageSize
        total
        data {
            title
            domain
            user {
                nickName
            }
        }
    }
}
        `, root).then(function(data) {
            assert(data.data.result.total > 10);
            assert(data.data.result.total <= 20);
            done();
        })
        .catch(function(err) {
            done(err);
        });
    });

    it('Query Data with wrong params', function(done) {
        graphql(schema, `
{
    result: getPostAsyn(pageNo: -1, pageSize: -1) {
        pageNo
        pageSize
        total
        data {
            title
            domain
            user {
                nickName
            }
        }
    }
}
        `, root).then(function(data) {
            assert(data.data.result.total <= 10);
            done();
        })
        .catch(function(err) {
            done(err);
        });
    });
});