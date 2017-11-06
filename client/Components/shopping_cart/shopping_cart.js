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
    $('')

  }

})


Template.shopping_cart_card.events({
  'change .quantity': function(event){
    var quantity = document.getElementById(this._id).value;


},
})

/**
'click #product-removal': function(event){

      removeItem(this);
}
});

function updateQuantity(quantity_input)
**/
