const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;


// dummy data  for books

var books = [
    { name: 'books 1', genre: 'genre 1', id: '1' },
    { name: 'books 2', genre: 'genre 2', id: '2' },
    { name: 'books 3', genre: 'genre 3', id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type:GraphQLString} },
            resolve(parent, args){
                // code to get data from db/other source
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});