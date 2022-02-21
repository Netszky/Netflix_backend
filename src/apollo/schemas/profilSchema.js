const { gql } = require('apollo-server-express');

module.exports = gql `
    type Profil {
        id: ID,
        name: String
        image: String
        wishlist: [Movie]
    }

    extend type Query {
        getProfils:[Profil!]        
        getProfil(id: ID):Profil
    }
    extend type Mutation {
        createProfil(name: String, image: String, wishlist: [ID]):Profil
        updateProfil(id: ID, name: String,image: String, wishlist: [ID]):Profil
        updateWishlist(id: ID, wishlist: [ID]):Profil
        deleteProfil(id: ID): Message
    }

`