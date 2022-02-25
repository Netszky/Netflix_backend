const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/userModel");
const Sub = require("../models/subModel");
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
            console.log("object", data.object)
            console.log(data.object.metadata.email)
            console.log(data.object.amount)
            let newSub = new Sub({
                price: data.plan.amout/100,
                type: data.plan.id
            })
            newSub.save()
                .then((datasub) => {
                    User.findByIdAndUpdate(data.object.metadata.userId, {
                        sub: datasub._id,
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
                            },
                            from: {
                                email: "julien.chigot@ynov.com",
                                name: "Julien Chigot"
                            },
                            templateId: "d-99ddfc49fe9f4b96b612a36d97762fc3",
                            dynamicTemplateData: {
                                amount: data.plan.amout/100
                            }
                        }).then(() => {
                            console.log("Email Sent")
                        })
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
        default:
    }
    res.sendStatus(200);
};
