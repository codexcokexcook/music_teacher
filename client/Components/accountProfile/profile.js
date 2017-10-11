import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import './create_profile.html';
import './profile_card.html';


Template.profile.onRendered(function(){
  //Check if user created profile
  var data = Profile_details.find({'user_id': Meteor.userId()});

  if(data.count()){

    Blaze.render(Template.profile_card, document.getElementById('profile'));
  }
  else {
    Blaze.render(Template.create_profile, document.getElementById('profile'));
  }


})
