import { Meteor } from 'meteor/meteor';

Notifications = new Mongo.Collection('notifications');

Meteor.methods({
  'notification.place_order'(seller_id, buyer_id, product_id, quantity){
    var buyer_name = Profile_details.findOne({user_id: buyer_id}).foodie_name;
    var dish_name = Dishes.findOne({_id: product_id}).dish_name;
    var title = 'New incoming order';
    var message = buyer_name + ' has just placed ' + quantity + 'x '+ dish_name + ' from you.'

    Notifications.insert({
      receiver_id: seller_id,
      sender_id: buyer_id,
      title: title,
      content: message,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  'notification.confirm_order'(seller_id, buyer_id) {
    var seller_name = Kitchen_details.findOne({user_id: seller_id}).chef_name;
    var title = 'Your order is confirmed';
    var message = seller_name + ' has just confirmed your order. Please get ready!';

    Notifications.insert({
      receiver_id: buyer_id,
      sender_id: seller_id,
      title: title,
      content: message,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  'notification.reject_order'(seller_id, buyer_id) {
    var seller_name = Kitchen_details.findOne({user_id: seller_id}).chef_name;
    var title = 'Your order is rejected';
    var message = 'Unfortunately, ' + seller_name + ' has just rejected your order.';

    Notifications.insert({
      receiver_id: buyer_id,
      sender_id: seller_id,
      title: title,
      content: message,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  'notification.update'(id) {
    Notifications.update(
      {_id: id},
      {$set:{read: true, updatedAt: new Date()}
    });
  }
});
