import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

Order_record = new Mongo.Collection('order_record');

Meteor.methods({
  'chargeCard': function(stripeToken, amount, description) {
    var Stripe = StripeAPI('sk_test_K51exlBQovfRkYAag2TKbzjl');

    Stripe.charges.create({
      amount: amount,
      currency: 'hkd',
      source: stripeToken,
      description: description
    }, function(err, charge) {
      console.log(err, charge);
    });
  },

  'order_record.insert'(
    buyer_id,
    seller_id,
    product_id,
    quantity,
    address,
    serving_option,
    serve_date,
    serve_time
  ){
    Order_record.insert({
      buyer_id: buyer_id,
      seller_id: seller_id,
      product_id: product_id,
      quantity: quantity,
      address: address,
      serving_option: serving_option,
      serve_date: serve_date,
      serve_time: serve_time,
      createdAt: new Date(),
      updatedAt: new Date()

    })

  }
});
