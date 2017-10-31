import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';


Template.foodie_profile_card.onRendered(function(){

var get_profile = Profile_details.findOne({'user_id': Meteor.userId()});

})


Template.foodie_profile_card.helpers({
/**    'profile_details': function () {
      var get_profile_details = Profile_details.findOne({'user_id': Meteor.userId()});
      return get_profile_details;
    },**/

/**    'get_foodie_profile': function(){
      return Profile_details.findOne({'user_id': Meteor.userId()});
    },

    'created_dishes': function(){
      var get_dishes = Dishes.find({'user_id': Meteor.userId()});
      return get_dishes;

    }**/


});

Template.homecook_profile_card.helpers({
  /**  'kitchen_details': function () {
      var get_kitchen_details = Kitchen_details.findOne({'user_id': Meteor.userId()});
      return get_kitchen_details;
    },**/


});



/**
Template.profile_card.helpers ({
  'profile_details': function () {

    var get_profile_details = Profile_details.findOne({"userId":userId});

    return get_profile_details;
  }
});
**/
