import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';

Template.shopping_cart_card.helpers({

'shopping_cart': function(){

  var shopping_cart = Shopping_cart.find({"buyer_id": Meteor.userId()})
  return shopping_cart
},

'foodie_details': function(){

  var foodie_details = Profile_details.findOne({"user_id": Meteor.userId()})
  return foodie_details
},

'foodie_name': function(){

  var foodie_details = Profile_details.findOne({"user_id": Meteor.userId()})
  return foodie_details.foodie_name
},

'total_price_per_dish':function(){

  var shopping_cart = Shopping_cart.find({"buyer_id": Meteor.userId()})
  var dish_price = shopping_cart.dish_price


},

})


/**Template.shopping_cart_card.events({
$('.quantity').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});
})**/
