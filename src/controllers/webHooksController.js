const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/orderModel");
const User = require("../models/userModel");
exports.stripewebhook = (req, res) => {

    let data;
    let eventType;

    const webhookSecret = "whsec_qfvMIf3LlYOUhMrXoMOccJFvJwdCPK4w";

    if (webhookSecret) {
        let event;
        let signature = req.headers["stripe-signature"];

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err);
            return res.sendStatus(400);
        }
        data = event.data;
        eventType = event.type;

    } else {
        data = req.body.data;
        eventType = req.body.type;
    }

    switch (eventType) {
        case "customer.subscription.created":
            console.log(data)
            User.findByIdAndUpdate(data.object.metadata.userId, {
                $set: {
                    isSub: true
                }
            }, { omitUndefined: true }).then((data) => {
                console.log("UPDATED", data.isSub)
            }).then(() => {
                let client = require('@sendgrid/mail');
                client.setApiKey(process.env.SEND_GRID);

                client.send({
                    to: {
                        email: data.object.metadata.email,
                        name: data.firstname
                    },
                    from: {
                        email: "julien.chigot@ynov.com",
                        name: "Julien Chigot"
                    },
                    templateId: "d-5304813abf6c4ab580c29287372e5ca3",
                    dynamicTemplateData: {
                        name: data.firstname,
                        email: data.email
                    }
                }).then(() => {
                    console.log("Email Sent")
                })
            })

            // const newOrder = new Order ({
            //     amout: data.object.amount/100,
            //     date: data.object.created,
            //     user: data.object.metadata.userId,
            //     products: productIdArray,
            //     stripeId: data.object.id,
            //     status: data.object.status
            // });
            // newOrder.save().then(() => console.log(data)).catch((err) => console.log(err));
            break;
        // case "invoice.payment_succeeded":
        //     console.log("Ohzaoiodjzaio", data.object.metadata.userId)
        //     return User.findByIdAndUpdate(data.object.metadata.userId, {
        //         isSub: true
        //     }, { omitUndefined: true })
        //     // const newOrder = new Order ({
        //     //     amout: data.object.amount/100,
        //     //     date: data.object.created,
        //     //     user: data.object.metadata.userId,
        //     //     products: productIdArray,
        //     //     stripeId: data.object.id,
        //     //     status: data.object.status
        //     // });
        //     // newOrder.save().then(() => console.log(data)).catch((err) => console.log(err));
        //     break;
        default:
    }
    res.sendStatus(200);
};
