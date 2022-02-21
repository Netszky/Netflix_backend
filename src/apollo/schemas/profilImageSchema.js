const { gql } = require('apollo-server-express');

module.exports = gql`
    type ProfilImage {
        id: ID
        url: String
    }
    extend type Query {
        getProfilsImages:[ProfilImage!]
    }
    extend type Mutation {
        createProfilImage(url: String): ProfilImage
        deleteProfilImage(id: ID): Message
    }
`