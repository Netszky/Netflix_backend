const { gql } = require('apollo-server-express');

module.exports = gql`
    type Sub {
        id: ID
        type: String
        price: String
        date: String
    }
`