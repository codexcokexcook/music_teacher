import { search_distinct_order_record_orders_tracking } from '/imports/functions/orders_tracking.js';
import { date_time_conversion } from '/imports/functions/date_time_conversion.js';

Template.orders_tracking.helpers({
  'order': function() {
    var order = Order_record.find({'buyer_id': Meteor.userId(), 'status': 'Created'}).count()
    console.log('Order: ' + order)
    return order
  },
  'order_sent': function() {
    var order = search_distinct_order_record_orders_tracking('seller_id', 'Created')
    console.log(order);
    return order
  },
  'cooking': function() {
    var cooking = Order_record.find({'buyer_id': Meteor.userId(), 'status': "Cooking"}).count()
    console.log('Cooking: ' + cooking)
    return cooking
  },
  'order_cooking': function() {
    var cooking = search_distinct_order_record_orders_tracking('_id', 'Cooking')
    console.log(cooking)
    return cooking
  }
})

Template.pending_confirmation.helpers({
  'kitchen_profile_picture': function(){
    var foodie = profile_images.findOne({'userId': String(this), "meta.purpose": "homecook_profile_picture"})
    return foodie._id + foodie.extensionWithDot
  },
  'get_kitchen_name': function() {
    var kitchen = Kitchen_details.findOne({'user_id': String(this)})
    return kitchen.kitchen_name;
  },
  'ordered_dish': function(){

    var order = Order_record.findOne({'seller_id': String(this), 'buyer_id': Meteor.userId(), 'status': 'Created'})
    var trans_no = order.transaction_no
    return Order_record.find({'seller_id': String(this), 'buyer_id': Meteor.userId(), 'transaction_no': trans_no, 'status': 'Created'})
  },
  'product_is_dish': function() {
    if (Dishes.findOne({'_id': this.product_id})) {
      return true;
    } else {
      return false;
    }
  },
  'get_dish_name': function(){
    return Dishes.findOne({'_id': this.product_id}).dish_name;
  },
  'get_dish_image': function(){
    var dish_image_id = Dishes.findOne({'_id': this.product_id}).image_id
    var ext = Images.findOne({'_id': dish_image_id}).extensionWithDot
    return dish_image_id + ext
  },
  'get_dish_qty': function(){
    return Order_record.findOne({'product_id': this.product_id}).quantity
  },
  'get_menu_name': function(){
    return Menu.findOne({'_id': this.product_id}).menu_name;
  },
  'get_menu_image': function(){
    var dish_image_id = Menu.findOne({'_id': this.product_id}).image_id[0]
    var ext = Images.findOne({'_id': dish_image_id}).extensionWithDot
    return dish_image_id + ext
  },
  'get_menu_qty': function(){
    return Order_record.findOne({'product_id': this.product_id}).quantity
  }
})

Template.foodies_confirmed_order.helpers({
  'set_timer': function() {
    var name = String(this);
    var initial_value  = [];
    Session.set(name, initial_value);
    var order = Order_record.findOne({'_id': String(this)});
    var date_time = order.ready_time;
    console.log(date_time);

    countdown = Meteor.setInterval(function(){
      var time_remaining = date_time_conversion(date_time, new Date().getTime());
      Session.set(name,time_remaining)
    },1000)
  },

  'time_is_up': function() {
    var time = Session.get(this);
    if (parseInt(time.days) < 0 || parseInt(time.hours) < 0 || parseInt(time.minutes) < 0) {
      Meteor.clearInterval(this.countdown);
      return true;
    } else {
      return false;
    }
  },

  'getCountdown': function(template) {
    var name = String(this)
    return Session.get(name);
  },

  'foodie_profile_picture': function(){
    var order = Order_record.findOne({'_id': String(this)})
    var buyer_id = order.buyer_id
    var foodie = profile_images.findOne({'userId': buyer_id, "meta.purpose": "profile_picture"})
    return foodie._id + foodie.extensionWithDot
  },
  'product_is_dish': function() {
    var order = Order_record.findOne({'_id': String(this)})
    var product_id = order.product_id;
    if (Dishes.findOne({'_id': product_id})) {
      return true;
    } else {
      return false;
    }
  },
  'dishes_in_menu': function() {
    var order = Order_record.findOne({'_id': String(this)})
    return Menu.findOne({'_id': order.product_id});
  },
  'get_menu_dish_name': function() {
    return Dishes.findOne({'_id': String(this)}).dish_name;
  },
  'get_menu_dish_image': function() {
    var dish_image_id = Dishes.findOne({'_id': String(this)}).image_id
    var ext = Images.findOne({'_id': dish_image_id}).extensionWithDot

    return dish_image_id + ext
  },
  'get_menu_qty': function() {
    return dish_qty;
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
    dish_qty = Order_record.findOne({'product_id': dish_id}).quantity
    return dish_qty;
  },
})
