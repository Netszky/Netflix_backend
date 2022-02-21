const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/orderModel");
const User = require("../models/userModel");
exports.stripewebhook = (req, res) => {

    let data;
    let eventType;

    const webhookSecret = "whsec_e3646a0531ed042db036a90c51f7edac06cceca88b1c18a4044454cb84eeca43";

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
            })
            const mailjet = require('node-mailjet')
                .connect('2fc6c1eb1282df906149de7974b5f65a', '77daf3005abc15c0e150412225994293')
            const request = mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [
                        {
                            "From": {
                                "Email": "julien.chigot@ynov.com",
                                "Name": "Julien"
                            },
                            "To": [
                                {
                                    "Email": data.object.metadata.email,
                                    "Name": "Julien"
                                }
                            ],
                            "Subject": "thanks for subscribing to Netflix",
                            "TextPart": "My first Mailjet email",
                            "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                            "CustomID": "AppGettingStartedTest"
                        }
                    ]
                })
            request
                .then((result) => {
                    console.log(result.body)
                })
                .catch((err) => {
                    console.log(err.statusCode)
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