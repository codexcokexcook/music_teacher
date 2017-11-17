import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.cooking_tab.onRendered(function(){
  $('ul.tabs').tabs();
  if(!Kitchen_details.findOne({user_id:Meteor.userId()})) {
    $('#check_kitchen_modal').modal('open');
  }
});
