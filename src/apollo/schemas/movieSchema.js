const { gql } = require('apollo-server-express');

module.exports = gql `
    type Movie {
        id: ID,
        name: String,
        categories: [Category!],
        actor: [Person]
        duration: String
        director: [Person]
        description: String
        year: Int
        image: String
        url: String
    }
    input MovieInput {
        id: ID!
        name: String,
        categories: [ID!],
        actor: [ID]
        duration: String
        director: [ID]
        description: String
        year: Int
        url: String
        image: String
    }
    input CreateMovieInput {
        name: String,
        categories: [ID],
        actor: [ID]
        duration: String
        director: [ID]
        description: String
        year: Int
        image: String
        url: String
    }
    extend type Query {
        getMovies:[Movie!]
        getMoviesByCategory(categories: String):[Movie]
        getMoviesByCategories(categories: [String]):[Movie]
        getMovie(id: ID):Movie
    }
    extend type Mutation {
        createMovie(Movie: CreateMovieInput):Movie
        updateMovie(Movie: MovieInput): Movie
        deleteMovie(id: ID): Message
    }

`