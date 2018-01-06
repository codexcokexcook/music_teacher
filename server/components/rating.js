import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Order_ratings = new Mongo.Collection('order_ratings');

Meteor.methods({
  'rating.insert'(rating) { //order_id has to be added later when integrated with order_tracking template
    //check(order_id, Match.Any);
    check(rating, Number);

    Order_ratings.insert({
      //order_id: orderid,
      rating: rating,
      createdAt: new Date()
    });
  }
});
