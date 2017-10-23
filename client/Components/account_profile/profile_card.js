import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';



Template.profile_card.helpers({
    'profile_details': function () {
      var get_profile_details = Profile_details.findOne({'user_id': Meteor.userId()});
      return get_profile_details;
    },

    'created_dishes': function(){
      var get_dishes = Dishes.find({'user_id': Meteor.userId()});
      return get_dishes;

    },

    'profile_images': function(){
      var get_profile_images = Profile_images.findOne({'userId': Meteor.userId(),'meta':{"purpose": "profile_picture"}});

      var get_profile_images_id = get_profile_images && get_profile_images._id;

      var get_profile_images_ext = get_profile_images && get_profile_images.extensionWithDot;

      var get_profile_images_name = get_profile_images_id + get_profile_images_ext;

      return get_profile_images_name;
    }



});

Template.profile_created_dishes.helpers({

  'dishes': function () {
    var get_dishes_details = Dishes.findOne({'user_id': Meteor.userId()});
    return get_dishes_details;
  }

});



/**
Template.profile_card.helpers ({
  'profile_details': function () {

    var get_profile_details = Profile_details.findOne({"userId":userId});

    return get_profile_details;
  }
});
**/
