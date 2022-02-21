const { gql } = require('apollo-server-express');

module.exports = gql`
    type Category {
        id: ID,
        name: String
    }
    extend type Query {
        getCategories:[Category!]
        getCategory(id:ID!):Category
    }
    extend type Mutation {
        createCategory(name: String): Category
        updateCategory(id: ID, name:String): Category
        deleteCategory(id: ID): Message
    }
`