import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';
import { search_distinct_in_order_record } from '/imports/functions/shopping_cart.js';

Template.start_cooking.helpers({

  'order': function(){
    var order = Order_record.find({'seller_id': Meteor.userId(), 'status': 'Created'}).count()
    console.log(order)
    return order

  },

  'order_received': function(){
    var check = search_distinct_in_order_record('buyer_id')
    console.log(check)
    return check
  }

})


Template.request_card.helpers({

  'foodie_profile_picture': function(){
    var foodie = profile_images.findOne({'userId': String(this), "meta": {"purpose": "profile_picture"}})
    return foodie._id + foodie.extensionWithDot

  },

  'get_transaction_no': function(){
    var order = Order_record.findOne({'buyer_id': String(this), 'seller_id': Meteor.userId(), 'status': 'Created'})
    return order.transaction_no
  },

  'ordered_dish': function(){

    var order = Order_record.findOne({'buyer_id': String(this), 'seller_id': Meteor.userId(), 'status': 'Created'})
    var trans_no = order.transaction_no
    return Order_record.find({'buyer_id': String(this), 'seller_id': Meteor.userId(), 'transaction_no': trans_no, 'status': 'Created'})
  },

  'get_dish_name': function(){
    return Dishes.findOne({'_id': this.product_id}).dish_name
  },

  'get_dish_image': function(){
    var dish_image_id = Dishes.findOne({'_id': this.product_id}).image_id
    var ext = Images.findOne({'_id': dish_image_id}).extensionWithDot

    return dish_image_id + ext
  },

  'get_dish_qty': function(){
    return Order_record.findOne({'product_id': this.product_id}).quantity

  }


})
