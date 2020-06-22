## Node backend for tipsi stripe ❤️

This is stripe backend in node.js. This will handle the Stripe.charges.create method.

#
 
## Configurations ⚙️
* Login to stripe.com
* Get secret key from dashboard.stripe.com
* Replace `sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXX` with your secret key.
```
var stripe_sk = 'sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXX';
```
## How to run 🏃‍♂️

* First install required packages listed in `package.json` file by `yarn install` or `npm install`

* Host it by command
```
node index.js
```
* As definied, port is `3001`, check
```
http://localhost:3001
```
* If `"Hello World!"` appears on in browser, your backend is ready to 🚀

#

## Keypoints for backend 🔎
You can find implementation in `index.js` file, but here is quick view.

```
var stripe_sk = 'sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXX';
```

```
router.post('/createStripePaymentIntent', function (req, res) {
  var stripe = require("stripe")(stripe_sk);
  let ptc = req.body.amount; // amount to charge
  let cr = req.body.currency; // currency in which ammount is changed

  console.log(ptc, cr);
  stripe.charges.create({
    amount: ptc,
    currency: cr,
    source: "tok_mastercard"
  }, function (err, paymentIntent) {
    res.json({
      setupIntentId: paymentIntent.client_secret
    })
  });
})
```
#

Open for contributions ❤️. Feel free to improve or suggest anything 😇.