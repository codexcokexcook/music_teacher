import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';
import { search_distinct_in_shopping_cart } from '/imports/functions/shopping_cart.js'
import { search_distinct_for_delivery_in_shopping_cart } from '/imports/functions/shopping_cart.js'

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

})

Template.sc_cost_summary.helpers({

  'total_food_price':function(){
    var total_food_price = 0;
    Shopping_cart.find({"buyer_id": Meteor.userId()}).map(function(doc) {
      total_food_price += parseInt(doc.total_price_per_dish);
    });
    return total_food_price;
  },

'total_delivery_cost':function(){

 var total_delivery_cost = 0
 var no_destination = search_distinct_for_delivery_in_shopping_cart(Shopping_cart, 'seller_id').length
 var delivery_cost_per_place = 50
 var total_delivery_cost = no_destination * delivery_cost_per_place
 return total_delivery_cost
},

'total_price':function(){
  var total_food_price = 0;
  var no_destination = search_distinct_for_delivery_in_shopping_cart(Shopping_cart, 'seller_id').length
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
],

'check_shopping_cart': function(){
    return Shopping_cart.findOne({"buyer_id": Meteor.userId()})
},

'single_address': function() {
    return _.uniq(Shopping_cart.find({'buyer_id': Meteor.userId()},{sort: {
      project: 1}
    }).fetch(), true, doc => {
      return doc.seller_id;
    });
},

'single_dish': function(){
    return Shopping_cart.find({"buyer_id": Meteor.userId(), "seller_id": this.seller_id})

},

'get_chef_name':function(){
    var kitchen = Kitchen_details.findOne({"user_id": this.seller_id})
    return kitchen.chef_name
},

'get_serving_address':function(){
    var address_option = Session.get('serving_address')
    var profile_details = Profile_details.findOne({'user_id': Meteor.userId()})
    var kitchen_details = Kitchen_details.findOne({'user_id': this.seller_id})
    var shopping_cart = Shopping_cart.findOne({'buyer_id': Meteor.userId()})

    if(address_option === 'home_address'){
      return profile_details.home_address
    }else if(address_option === 'office_address'){
      return profile_details.office_address
    }else if(address_option === 'current_address'){
      return Session.get('address')
    }else{
      return "Please choose the address for serving!!!"
    }
},

'get_kitchen_address': function(){

    var kitchen = Kitchen_details.findOne({"user_id": this.seller_id})
    return kitchen.kitchen_address
}
})


Template.sc_serving_details.events({



  'change #serving_address_select':function(event){
    var option = $('#serving_address_select').val();

    Session.set('serving_address', option)
},

  'change .option_select':function(event){
    var field_name = '#'+this.seller_id+"_option_select"
    var serving_option = $(field_name).val()
    var address = $('#serving_address').text()
    var seller_id = this.seller_id
    var buyer_id = Meteor.userId()

     console.log(buyer_id, seller_id, serving_option, address)

    Meteor.call('shopping_cart.update_serving',
      buyer_id,
      seller_id,
      address,
      serving_option,
      )
    },

})


Template.sc_payment.helpers({
  'get_credit_card': function(){
      var profile_details = Profile_details.findOne({"user_id": Meteor.userId()})
      return profile_details.card_number
  },
  'get_cvc':function(){
    var profile_details = Profile_details.findOne({"user_id": Meteor.userId()})
    return profile_details.cvv_code
  },
  'get_exp_month':function(){
    var profile_details = Profile_details.findOne({"user_id": Meteor.userId()})
    return profile_details.card_exp_month
  },
  'get_exp_year':function(){
    var profile_details = Profile_details.findOne({"user_id": Meteor.userId()})
    return profile_details.card_exp_year
  },
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


Template.sc_payment.events({
'submit form':function(event){
  ccNum = '4000003440000004'
  cvc = '666'
  expMo = '03'
  expYr = '24'

  Stripe.card.createToken({
  	number: ccNum,
  	cvc: cvc,
  	exp_month: expMo,
  	exp_year: expYr,
  }, function(status, response) {
  	stripeToken = response.id;
  	Meteor.call('chargeCard', stripeToken);
  });
}
})
