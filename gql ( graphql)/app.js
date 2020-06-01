const express = require('express');

const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema')
const app = express();



app.use('/graphql', new expressGraphQL({
    graphiql: true,
    schema
}))



app.listen(2100, () => {
    console.log('listening on port 2100');
})