import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';
import { search_distinct } from '/imports/functions/find_by.js'

Template.shopping_cart_card.helpers({

'check_shopping_cart': function(){
    return Shopping_cart.findOne({"buyer_id": Meteor.userId()})
},

'shopping_cart': function(){
    return Shopping_cart.find({"buyer_id": Meteor.userId()})
},

'total_price_per_dish': function(){
    return this.quantity*this.product_price
},

'total_food_price':function(){
  var total_food_price = 0;
  Shopping_cart.find({"buyer_id": Meteor.userId()}).map(function(doc) {
    total_food_price += parseInt(doc.total_price_per_dish);
  });
  return total_food_price;
},

'total_delivery_cost':function(){

 var no_destination = search_distinct(Shopping_cart, 'seller_id').length
 var delivery_cost_per_place = 50
 var total_delivery_cost = no_destination * delivery_cost_per_place
 return total_delivery_cost
},

'total_price':function(){
  var total_food_price = 0;
  var no_destination = search_distinct(Shopping_cart, 'seller_id').length
  var delivery_cost_per_place = 50
  var total_price = 0

  Shopping_cart.find({"buyer_id": Meteor.userId()}).map(function(doc) {
    total_food_price += parseInt(doc.total_price_per_dish);
  });

  total_price = no_destination * delivery_cost_per_place + total_food_price
  return total_price
}

})


Template.sc_serving_details.onRendered(function() {
  this.$('select').material_select();
})

Template.sc_serving_details.helpers({
service_option_list:[
  { service_option: 'Pick-up', option:'Pick-up'},
  { service_option: 'Delivery', option:'Delivery'},
  { service_option: 'Dine-in', option:'Dine-in'},
]
})

Template.sc_serving_details.events({
  'change #sc_select_serving_option':function(event){
    var option = $('#sc_select_serving_option').val();
    if(option ==='Pick-up'){
      BlazeLayout.render('screen',{navbar: "bp_navbar",render_component:'shopping_cart_card', serving_details:'sc_serving_details_pick_up'});
    }else if(option ==='Delivery'){
      BlazeLayout.render('screen',{navbar: "bp_navbar",render_component:'shopping_cart_card', serving_details:'sc_serving_details_delivery'});
    }else if(option ==='Dine-in'){
      BlazeLayout.render('screen',{navbar: "bp_navbar",render_component:'shopping_cart_card', serving_details:'sc_serving_details_dine_in'});
    }else{
      BlazeLayout.render('screen',{navbar: "bp_navbar",render_component:'shopping_cart_card', serving_details:'sc_serving_details_pick_up'});
    }
  }

})


Template.sc_payment.helpers({
  'get_credit_card': function(){
      var profile_details = Profile_details.findOne({"user_id": Meteor.userId()})
      return profile_details.card_number
  }
})



Template.shopping_cart_card.events({
'change .quantity': function(event){
    var cart_id = this._id
    var field_name = this._id+"_quantity"
    var quantity = document.getElementById(field_name).value;
    var total_price_per_dish = quantity*this.product_price

    Meteor.call('shopping_cart.update',
      cart_id,
      quantity,
      total_price_per_dish)
    },

'click .remove_button': function(event){
    var cart_id = this._id;

    Meteor.call('shopping_cart.remove',
      cart_id)
  }

})
