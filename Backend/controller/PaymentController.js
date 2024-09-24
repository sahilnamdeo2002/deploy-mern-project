const catchasyncerror=require("../middleware/catchasyncerror");

const STRIPE_SECRET_KEY="sk_test_51Pu9YZECHo7SZY24H9Ahq3iNab6HA3hoc6eH7vwInGD6f5lsNsFpJs6Iehe5FILwXjN7U1E3CTonWu9UVoMuxFop00qA56fnes";
const STRIPE_API_KEY="pk_test_51Pu9YZECHo7SZY2406Lo9P4GduHjpS70QGvF0DEgWYRtHh07jrA0FRetkatuNzDzvgrzcrNnpHZaY2jlLnrdnE0n00mPq5bKxR";

const stripe=require("stripe")(STRIPE_SECRET_KEY);
exports.processPayment = catchasyncerror(async (req, res, next) => {



    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
  
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  });
  
  exports.sendStripeApiKey = catchasyncerror(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: STRIPE_API_KEY });
  });
  