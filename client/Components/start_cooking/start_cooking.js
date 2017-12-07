import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';
import { ReactiveVar } from 'meteor/reactive-var'
import { search_distinct_in_order_record } from '/imports/functions/shopping_cart.js';
import { get_time_remaining } from '/imports/functions/get_time_remaining.js';

Template.start_cooking.helpers({
  'cooking': function(){
    var cooking = Order_record.find({'seller_id': Meteor.userId(), 'status': "Cooking"}).count()
    console.log('Cooking: ' + cooking)
    return cooking
  },

  'order_cooking': function(){
    var cooking = search_distinct_in_order_record('_id', 'Cooking')
    console.log(cooking)
    return cooking
  },

  'order': function(){
    var order = Order_record.find({'seller_id': Meteor.userId(), 'status': 'Created'}).count()
    console.log('Order: ' + order)
    return order

  },

  'order_received': function(){
    var order = search_distinct_in_order_record('buyer_id', 'Created')
    console.log(order)
    return order
  }

})

Template.order_card.onDestroyed(function() {
  var name = String(this);
  Session.delete(name);
})

Template.order_card.helpers({
  'set_timer': function() {
    var name = String(this);
    var initial_value  = [];
    Session.set(name, initial_value);

    Meteor.setInterval(function(){
      var countdown = get_time_remaining('September 8 2018 14:50:30 UTC-0400');
      Session.set(name,countdown)
    },1000)
  },

  'getCountdown': function(template) {
    var name = String(this)
    return Session.get(name);
  },

  'foodie_profile_picture': function(){
    var order = Order_record.findOne({'_id': String(this)})
    var buyer_id = order.buyer_id
    var foodie = profile_images.findOne({'userId': buyer_id, "meta": {"purpose": "profile_picture"}})
    return foodie._id + foodie.extensionWithDot
  },

  'get_foodie_name': function() {
    var order = Order_record.findOne({'_id': String(this)})
    var buyer_id = order.buyer_id
    var foodie = Profile_details.findOne({'user_id': buyer_id})
    return foodie.foodie_name;
  },

  'get_transaction_no': function(){
    var order = Order_record.findOne({'_id': String(this)})
    return order.buyer_id + order.transaction_no
  },

  'get_dish_image': function(){
    var order = Order_record.findOne({'_id': String(this)})
    var dish_id = order.product_id
    var dish_image_id = Dishes.findOne({'_id': dish_id}).image_id
    var ext = Images.findOne({'_id': dish_image_id}).extensionWithDot

    return dish_image_id + ext
  },

  'get_dish_name': function(){
    var order = Order_record.findOne({'_id': String(this)})
    var dish_id = order.product_id
    return Dishes.findOne({'_id': dish_id}).dish_name
  },

  'get_dish_qty': function(){
    var order = Order_record.findOne({'_id': String(this)})
    var dish_id = order.product_id
    return Order_record.findOne({'product_id': dish_id}).quantity
  },
})

Template.request_card.events({
  'click .cooking_card_profile_picture': function() {
    var route = '/foodies/' + String(this);
    FlowRouter.go(window.open(route,'_blank'));
  }
});



Template.request_card.helpers({

  'foodie_profile_picture': function(){
    var foodie = profile_images.findOne({'userId': String(this), "meta": {"purpose": "profile_picture"}})
    return foodie._id + foodie.extensionWithDot

  },

  'get_foodie_name': function() {
    var foodie = Profile_details.findOne({'user_id': String(this)})
    return foodie.foodie_name;
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

  },


})


Template.request_card.events({

  'click #accept': function(){

    var buyer_id = String(this)
    var seller_id = Meteor.userId()
    var trans_no = Order_record.findOne({'buyer_id': buyer_id, 'seller_id': seller_id, 'status': 'Created'}).transaction_no
    var product =  Order_record.find({'buyer_id': buyer_id, 'seller_id': seller_id, 'transaction_no': trans_no, 'status': 'Created'}).fetch()

    product.forEach(add_order_to_transaction)

    function add_order_to_transaction(array_value, index){

setTimeout(function(){
      var order = array_value
      console.log(order)
      var trans_no = String(order.transaction_no)
      var order_id = String(order._id)
      var buyer_id = String(order.buyer_id)
      var seller_id = String(order.seller_id)
      var product_id = String(order.product_id)
      var quantity = String(order.quantity)
      var serve_date = String(order.serve_date)
      var serve_time = String(order.serve_time)
      var serving_option = String(order.serving_option)
      var status = String(order.status)
      var stripeToken = String(order.stripeToken)



      var check = Transactions.find({'buyer_id': buyer_id, 'seller_id': seller_id, 'transaction_no': trans_no}).fetch()
      console.log(check.length)
      if(check.length >0){
        console.log(1)
        Meteor.call('transactions.update', trans_no, buyer_id, seller_id, order_id, stripeToken)
        Meteor.call('order_record.accepted', order_id)
      }else{
        console.log(2)

        Meteor.call('transactions.insert', trans_no, buyer_id, seller_id, order_id, stripeToken)
        Meteor.call('order_record.accepted', order_id)
      }



  },1000*index)

}


  },

  'click #reject': function(){

    var buyer_id = String(this)
    console.log(buyer_id)




  }


})
