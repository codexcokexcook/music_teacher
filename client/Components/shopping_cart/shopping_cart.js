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
 var no_destination = search_distinct_for_delivery_in_shopping_cart('seller_id').length
 var delivery_cost_per_place = 50
 var total_delivery_cost = no_destination * delivery_cost_per_place
 return total_delivery_cost
},

'total_price':function(){
  var total_food_price = 0;
  var no_destination = search_distinct_for_delivery_in_shopping_cart('seller_id').length
  var delivery_cost_per_place = 50
  var total_price = 0

  Shopping_cart.find({"buyer_id": Meteor.userId()}).map(function(doc) {
    total_food_price += parseInt(doc.total_price_per_dish);
  });

  total_price = no_destination * delivery_cost_per_place + total_food_price

  Session.set('cart_total_price', total_price)
  return total_price
}

})


Template.sc_serving_details.onRendered(function() {
  this.$('select').material_select();

  //activate datepicker
    this.$('.datepicker').pickadate({
    selectMonths: 1, // Creates a dropdown to control month
    selectYears: 0, // Creates a dropdown of 15 years to control year,
    today: 'TODAY',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true, // Close upon selecting a date,
    format: 'dd/mm/yyyy'
  });

  $('.timepicker').pickatime({
   default: 'now', // Set default time: 'now', '1:30AM', '16:30'
   fromnow: 1800000,       // set default time to * milliseconds from now (using with default = 'now')
   twelvehour: true, // Use AM/PM or 24-hour format
   donetext: 'OK', // text for done-button
   cleartext: 'Clear', // text for clear-button
   canceltext: 'Cancel', // Text for cancel-button
   autoclose: false, // automatic close timepicker
   ampmclickable: true, // make AM PM clickable
   aftershow: function(){} //Function for after opening timepicker
 });

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
},

'get_today': function(){
  var date = new Date()
  // GET YYYY, MM AND DD FROM THE DATE OBJECT
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();
  return dd+'/'+mm+'/'+yyyy
},

'get_now30': function(){
var date = new Date()
var hh = (date.getHours());
var mm = (date.getMinutes()+30);
  return hh+':'+mm
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
'click  #place_order':function(event){
  ccNum = $('#card_no').val()
  cvc = $('#cvc_no').val()
  expMo = $('#exp_month').val()
  expYr = $('#exp_year').val()
  amount = Session.get('cart_total_price')*100
  profile_details = Profile_details.findOne({user_id: Meteor.userId()})
  description = 'Blueplate.co - Charge for '+ profile_details.foodie_name;

  Stripe.card.createToken({
  	number: ccNum,
  	cvc: cvc,
  	exp_month: expMo,
  	exp_year: expYr,
  }, function(status, response) {
  	stripeToken = response.id;
  	Meteor.call('chargeCard', stripeToken, amount, description);
  });


    var shopping_cart = search_distinct_in_shopping_cart('product_id')



    function order_record_insert(array_value, index){

      var product_id = array_value
      var cart_details = Shopping_cart.findOne({'product_id': product_id})


      var cart_id = cart_details._id
      var buyer_id = cart_details.buyer_id;
      var seller_id = cart_details.seller_id;
      var address = cart_details.address;
      var quantity = cart_details.quantity;
      var serving_option = cart_details.serving_option;
      var serve_date = $('#serve_date').val();
      var serve_time = $('#serve_time').val();


      Meteor.call('order_record.insert', buyer_id, seller_id, product_id, quantity, address, serving_option, serve_date, serve_time)

      Meteor.call('shopping_cart.remove',cart_id)
  }
    shopping_cart.forEach(order_record_insert)

}
})
