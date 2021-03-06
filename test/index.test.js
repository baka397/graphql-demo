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
    result: postSync(pageNo: 2) {
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
            assert(data.data.result.data.length === (data.data.result.total - data.data.result.pageSize * (data.data.result.pageNo - 1)));
            done();
        })
            .catch(function(err) {
                done(err);
            });
    });

    it('Query post Asyn', function(done) {
        graphql(schema, `
{
    result: postAsyn(pageNo: 2) {
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
            assert(data.data.result.data.length === (data.data.result.total - data.data.result.pageSize * (data.data.result.pageNo - 1)));
            done();
        })
            .catch(function(err) {
                done(err);
            });
    });

    it('Query Data with wrong params', function(done) {
        graphql(schema, `
{
    result: postAsyn(pageNo: -1, pageSize: -1) {
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