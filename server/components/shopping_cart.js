import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

Order_record = new Mongo.Collection('order_record');

Meteor.methods({
  'chargeCard': function(stripeToken, amount, description) {
    var Stripe = StripeAPI('sk_test_K51exlBQovfRkYAag2TKbzjl');

    Stripe.charges.create({
      amount: amount*100,
      currency: 'hkd',
      source: stripeToken,
      description: description
    }, function(err, charge) {
      console.log(err, charge);
    });
  },

  'order_record.insert'(
    transaction_no,
    buyer_id,
    seller_id,
    product_id,
    quantity,
    total_price,
    address,
    serving_option,
    ready_time,
    stripeToken
  ){
    Order_record.insert({
      transaction_no: transaction_no,
      buyer_id: buyer_id,
      seller_id: seller_id,
      product_id: product_id,
      quantity: quantity,
      total_price: total_price,
      address: address,
      serving_option: serving_option,
      ready_time: ready_time,
      stripeToken: stripeToken,
      status: 'Created',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  },

  'order_record.accepted'(
    order_id
  ){
    Order_record.update({
      _id: order_id}, {
        $set:{
          status: 'Cooking',
           updatedAt: new Date()
          }
    })
  },

  'order_record.rejected'(
    order_id
  ){
    Order_record.update({
      _id: order_id}, {
        $set:{
          status: 'Rejected',
          updatedAt: new Date()
        }
      })
    },

  'order_record.ready'(
    order_id
  ){
    Order_record.update({
      _id: order_id}, {
        $set:{
          status: 'Ready',
          updatedAt: new Date()
        }
      })
    },

  'order_record.notify_buyer'(buyer_id){
    Order_record.find(
      {buyer_id: buyer_id, status: "Created"},
      { sort: { _id: -1 }, limit: 1 }).observeChanges({
        added: function(id, order_details) {
          console.log('test');
        }
      })
  },


});
