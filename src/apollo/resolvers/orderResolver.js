const Order = require('../../models/orderModel');

module.exports =  {
    Query: {
        getOrders: () => {
            return Order.find({})},
        getOrder: (parent, args, context) => {
            return Order.findById(args.id).populate('user')
        },
    },

    Mutation: {
        createOrder: (parent,args) => {
            let order = new Order({
                amount: args.Order.amount,
                date: args.Order.date,
                user: args.Order.user,
                stripeId: args.Order.stripeId,
                status: args.Order.status
            })
            return order.save()
        },
        updateOrder:(parent, args) => {
            return Order.findByIdAndUpdate(args.Order.id,{
                amount: args.Order.amount,
                date: args.Order.date,
                user: args.Order.user,
                stripeId: args.Order.stripeId,
                status: args.Order.status
            })
        },
        deleteOrder: async (parent, args) => {
           const exist =  await Order.exists({_id: args.Order.id})

            if(exist) {
                await Order.findByIdAndDelete(args.Order.id)
                return {
                    message: "Document supprimé",
                    code: 204
                }

            } else {
                return {
                    message: "Document non trouvé",
                    code: 404
                }
            }
        }
    }

}