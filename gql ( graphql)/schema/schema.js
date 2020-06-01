const { GraphQLObjectType, 
        GraphQLID, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLInt,
        GraphQLList
    } = require('graphql')

const _ = require('lodash');

const bookArr = [
    {id: '1', name: 'first book', genre: 'first', authorId: '2'},
    {id: '2', name: 'second book', genre: 'second', authorId: '1'},
    {id: '3', name: 'third book', genre: 'third', authorId: '2'},
    {id: '4', name: 'forth book', genre: 'fourth', authorId: '2'},
    {id: '5', name: 'fifth book', genre: 'fifth', authorId: '3'},
    {id: '6', name: 'sixth book', genre: 'sixth', authorId: '3'}
]

const authorArr = [
    {id: '1', name: 'first author', age: 35},
    {id: '2', name: 'second author', age: 45},
    {id: '3', name: 'third author', age: 55}
]


const BookType = new GraphQLObjectType ( {
    name: 'book',
    fields: () => ({
        id: { 
            type: GraphQLID
        },
        name: { 
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authorArr, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(bookArr , {authorId: parent.id})
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'myRootQuery',
    fields: {
        book: {
           type:  BookType,
           args: { id: { type: GraphQLID} },
           resolve(parent, args) {
               return _.find (bookArr, {id: args.id})
           }
        },
        books: {
            type:  new GraphQLList(BookType),
            resolve(parent, args) {
                return bookArr
            }
         },
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(authorArr, {id: args.id})
            }
        },
        authors: {
            type:  new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authorArr
            }
         },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve (parent, args) {
                var obj = { id: authorArr.length + 1, name: args.name, age: args.age}
                authorArr.push ( obj)
                console.log(authorArr);
                // return RootQueryType.authors
                return obj;
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                authorId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                console.log(args)
                var obj = { id: bookArr.length + 1, name: args.name, genre: args.genre, authorId: args.authorId}
                bookArr.push ( obj)
                console.log(bookArr);
                // return RootQueryType.authors
                return obj;
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})