import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import './landing_page.html';

Template.landing_page.onRendered(function() {
  $('body').css('overflow-y', 'hidden');
  window.onload = function(){
    $('body').css('overflow-y', 'scroll');
    $( "body" ).scrollTop(0);
    $('.loader-wrapper').fadeOut('slow');
  }
});

Template.login_modal.events({
  'click #login_modal_button': function() {
    if (login_content) {
      $('.forgot_password').remove();
      $('#login_modal').append(login_content);
    }
  }
});

Template.registerHelper('isCurrentUser',function(){
  return (localStorage.getItem("loggedIn").toLowerCase() === 'true');
});
