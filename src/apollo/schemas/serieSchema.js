const { gql } = require('apollo-server-express');

module.exports = gql `
    type Serie {
        id: ID,
        name: String,
        categories: [Category!],
        actor: [Person]
        duration: String
        director: [Person]
        year: Int
        description: String
    }
    input SerieInput {
        id: ID!
        name: String,
        categories: [ID!],
        actor: [ID]
        duration: String
        director: [ID]
        year: Int
        description: String
    }
    input CreateSerieInput {
        name: String,
        categories: [ID!],
        actor: [ID]
        duration: String
        director: [ID]
        year: Int
        description: String
    }
    extend type Query {
        getSeries:[Serie!]
        getSerie:Serie
    }
    extend type Mutation {
        createSerie(Serie: CreateSerieInput):Serie
        updateSerie(Serie: SerieInput): Serie
        deleteSerie(id: ID): Message
    }

`