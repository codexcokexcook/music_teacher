import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'chargeCard': function(stripeToken) {
    var Stripe = StripeAPI('sk_test_K51exlBQovfRkYAag2TKbzjl');

    Stripe.charges.create({
      amount: 1000,
      currency: 'hkd',
      source: stripeToken
    }, function(err, charge) {
      console.log(err, charge);
    });
  }
});
