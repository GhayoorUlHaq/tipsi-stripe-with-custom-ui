## React Native APP with Custom UI ♡

This is React Native mobile app to handle stripe payments with custom UI.

#

## Configurations ⚙️
* Login to stripe.com
* Get secret key from dashboard.stripe.com
* Replace `pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your publishable key in App.js.

```
stripe.setOptions({
  publishableKey: 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
});

```
## How to run 🏃‍♂️

* First install required packages listed in `package.json` file by `npm install`
* Install PODs for iOS using command

```
cd ios && pod install && cd ..
```
* Configure node.js backend that can be found [here](https://github.com/GhayoorUlHaq/tipsi-stripe-with-custom-ui/tree/master/backend) and run.
* Run application on either android or iOS emulator
* Make Payment with Tipsi Stripe Using Custom UI.

#

## Keypoint for Custom UI 🔎
* Set publishable key in `stripe.setOptions`
* Implement `stripe.createTokenWithCard` method to create card token by passing atleast required parameters that might be defined as state and user input. After this method.
* In call back of `stripe.createTokenWithCard`, make a request to node js backend that already implemented stripe.charges.create to make paymanet

You can find implementation in App.js, but here is quick view.

Import libraries 📚
```
import stripe from 'tipsi-stripe';
import axios from 'axios';
```

Setting publishable key 🔑
```
stripe.setOptions({
  publishableKey: 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
});
```

Create Card token 💳 and make request to backend server 🔖
```

try {
      this.setState({ loading: true, token: null })
      await stripe.createTokenWithCard({
          number: "4242424242424242",
          expMonth: 12,
          expYear: 20,
          cvc: '123',
          name: 'Test User',
          currency: 'usd',
          addressLine1: '123 Test Street',
          addressLine2: 'Apt. 5',
          addressCity: 'Test City',
          addressState: 'Test State',
          addressCountry: 'Test Country',
          addressZip: '55555',
          loading: false
      }).then((token)=>{
        
        console.log(token);
          axios({
            method: "POST",
            url: 'http://localhost:3001/createStripePaymentIntent',
            data: {
                amount:50099, //  = $500.99
                currency: 'usd',
            },
        }).then(response => {
            if(response.status === 200){
                alert("Payment Successful!");
            }else{
               alert("Error Making Payment!");
            }
        }).catch((error)=> {
            console.log(error);
        })
      

    });
      
    } catch (error) {
      alert("Error Making Payment!");
    }

```
#

Open for contributions ❤️. Feel free to improve or suggest anything 😇.
