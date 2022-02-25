const {gql} = require('apollo-server-express');

module.exports = gql `
    type User {
        id: ID
        firstname: String
        email: String
        password: String
        profil: [Profil]
        isSub: Boolean
        isAdmin: Boolean
        stripeID: String
        sub: Sub
    }
    type Query {
        getUsers:[User]
        getUser(id:ID):User
        getUserProfil:User
    }
    type Message {
        message: String
        code: Int
        test: String
    }
    input UserInput {
        id: ID!
        firstname: String
        email: String
        password: String
        profil: ID
    }
    input createUserInput {
        firstname: String
        email: String
        password: String
        profil: [ID]
    }
    type Mutation {
        createUser(User: createUserInput): User
        updateUser(id: ID, firstname: String, email: String,password: String,profil: ID, isSub:Boolean, isAdmin:Boolean, stripeID:String, sub:ID): User
        deleteUser(id: ID): Message
    }
`