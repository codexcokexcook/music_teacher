import {
  Accounts
} from 'meteor/accounts-base';
import {
  FlowRouter
} from 'meteor/ostrio:flow-router-extra';
import {
  Blaze
} from 'meteor/blaze';
import {
  FilesCollection
} from 'meteor/ostrio:files';
import {
  address_geocode
} from '/imports/functions/address_geocode.js';

Template.path_choosing.events({
  'click #create_homecook_profile': function(){
    FlowRouter.go('/profile/create_homecook_profile')
  },

  'click #preview_foodie_profile': function(){
    var profile_id = Profile_details.findOne({'user_id': this._id})
    var route = '/foodies/:' + String(profile_id)
    FlowRouter.go(route);
  },

  'click #preview_kitchen_profile': function(){
    var profile_id = Kitchen_details.findOne({'user_id': this._id})
    var route = '/kitchen/:' + String(profile_id)
    FlowRouter.go(route);
  },

  'click #create_first_dish': function(){
    FlowRouter.go('/cooking/dishes');
  },

  'click #divert_showroom': function(){
    FlowRouter.go('/main');
  },

})

Template.path_choosing.helpers({

  'check_homecook_profile': function(){
    var check = String(Kitchen_details.findOne({'user_id': Meteor.userId()}))
    if(check === 'undefined'){
      return true;
    } else {
      return false;
    }

},

/*  'check_first_dish': function(){
    var check = dishes.find({user_id: this._id}).length
    if(check===0){
      return true;
    }else{
      return false;
    }
  }, */


})