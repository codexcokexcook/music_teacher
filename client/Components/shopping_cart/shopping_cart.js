import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';

Template.shopping_cart_card.onRendered(function(){


});


Template.shopping_cart_card.helpers({

'shopping_cart': function(){
    var shopping_cart = Shopping_cart.find({"buyer_id": Meteor.userId()})
    return shopping_cart
},

'total_price_per_dish': function(){
    var total_price_per_dish = this.quantity*this.product_price
    return total_price_per_dish

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

    Meteor.call('shopping_cart.update',
      cart_id,
      quantity)
    },

'click .remove_button': function(event){
    var cart_id = this._id;

    Meteor.call('shopping_cart.remove',
      cart_id)
  }

})
