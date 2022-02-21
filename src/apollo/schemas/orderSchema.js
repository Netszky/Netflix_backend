const { gql } = require('apollo-server-express');

module.exports = gql`
    type Order {
        id: ID
        amount: Int,
        date: String,
        user: User,
        stripeId: String,
        status: String,
        isActive: Boolean
    }
    
    extend type Query {
        getOrders:[Order!]
        getOrder(id:ID!):Order
    }
    
    input OrderInput {
        id: ID
        amount: Int,
        date: String,
        user: ID,
        products:[ID],
        stripeId: String,
        status: String,
        isActive: Boolean
    }

    input CreateOrderInput {
        amount: Int,
        date: String,
        user: ID,
        products:[ID],
        stripeId: String,
        status: String,
        isActive: Boolean
    }
    extend type Mutation {
        createOrder(Order: CreateOrderInput): Order
        updateOrder(Order: OrderInput): Order
        deleteOrder(Order: OrderInput): Order
    }
`