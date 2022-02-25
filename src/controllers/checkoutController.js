const stripe = require('stripe')("sk_test_51KHUEnJslrGuoRGTedEi4dKYFGxbxahLan7SOYc3WJS3ubWa7Rs0HDjdmCW6jDLgWq4q4aUd1FwcxJ5SoIaNpHDR00hKnPvTsY");


const initiateStripeSession = async (req) => {
  // const customer = await stripe.customers.create({
  //   name: "jean",
  // });
  const subscription = await stripe.checkout.sessions.create({
    line_items: [
      {price: req.body.priceId.id, quantity:1},
    ],
    subscription_data: {
      metadata: { 
        userId: req.user.id,
        email: req.body.email
       },
    },
    success_url: `http://localhost:3000/confirmation`,
    cancel_url: `http://localhost:3000/home`,
    mode: 'subscription',
  });
  return subscription;
}


exports.createSession = async function (req, res) {
  try {
    const subscription = await initiateStripeSession(req)
    res.status(200).json({
      id: subscription.id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.cancel = async function (req, res){
  console.log(req)
  try {

    const deleted = await stripe.subscriptions.del(req.body.id)
      res.status(200).send({cancel:true});
    } catch (err) {
      res.status(500).send(err);
    }
}