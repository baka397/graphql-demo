'use strict';
const Graphql = require('graphql');
const graphql = Graphql.graphql;
const buildSchema = Graphql.buildSchema;
const Schema = require('./schemas/');
const querys = require('./queries/');
const handlebars = require('handlebars');
const compile = handlebars.compile;

const template = compile(document.getElementById('tmpl').innerHTML);
const schema = buildSchema(Schema);

const root = Object.assign({}, querys);

const query = `
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
`;
/* variable
 */
/* fragment
const query = `{
  leftComparison: getPost(pageNo: 1) {
    ...comparisonFields
  }
  rightComparison: getPost(pageNo: 2) {
    ...comparisonFields
  }
}

fragment comparisonFields on PostList {
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
}`;
*/
graphql(schema, query, root).then(function(data) {
    console.log('---Result Data---');
    console.log(data);
    document.getElementById('app').innerHTML = template(data.data.result);
});