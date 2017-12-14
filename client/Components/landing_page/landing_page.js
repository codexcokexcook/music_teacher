import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import './landing_page.html';

Template.landing_page.onRendered(function() {
  $('.modal').modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    });
});

Template.login_modal.events({
  'click #login_modal_button': function() {
    if (login_content) {
      $('.forgot_password').remove();
      $('#login_modal').append(login_content);
    }
  }
})
