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

     function find_in_order_record(array_value){
       var buyer_id = array_value
       console.log(buyer_id)
       var result = Order_record.find({'buyer_id': buyer_id, 'seller_id': Meteor.userId(), 'status': 'Created'})
       console.log(result)
       return result

     }

     for(i=0;i<check.length;i++){
       var result =[]
      result[i] = find_in_order_record(check[i])
     }
     console.log(result)
     return result
},



})



Template.request_card.helpers({

  'foodie_profile_picture': function(){
    console.log(this.buyer_id)
    var foodie = profile_images.findOne({'userId': this.buyer_id, "meta": {"purpose": "profile_picture"}})
    console.log(foodie._id + foodie.extensionWithDot)
    return foodie._id + foodie.extensionWithDot

  },

  'order_dish': function(){

  }


})
