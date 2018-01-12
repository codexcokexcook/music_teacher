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
  },
  'average_rating.update'(total_count, new_rating, previous_avg_rating, product_id, seller_id) {
    var new_avg_rating = (previous_avg_rating * (total_count - 1) + new_rating) / total_count;
    if (Dishes.findOne({_id: product_id})) {
      Dishes.update({
        _id: product_id
      },{
        $set:{
          average_rating: new_avg_rating
        }
      });
    } else {
      Menu.update({
        _id: product_id
      },{
        $set:{
          average_rating: new_avg_rating
        }
      });
    }
    Kitchen_details.update({
      user_id: seller_id
    },{
      $set:{
        average_rating: new_avg_rating
      }
    })
  }
});
