const { gql } = require('apollo-server-express');

module.exports = gql `
    type Person {
        id: ID,
        name: String
    }
    extend type Query {
        getPerson(id:ID):Person
        getPersons:[Person]
    }
    extend type Mutation {
        createPerson(name: String):Person
        updatePerson(id: ID, name: String): Person
        deletePerson(id: ID): Message
    }

`