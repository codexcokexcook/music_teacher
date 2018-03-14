import {
  Accounts
} from 'meteor/accounts-base';
import {
  FlowRouter
} from 'meteor/ostrio:flow-router-extra';
import {
  Template
} from 'meteor/templating';
import {
  Blaze
} from 'meteor/blaze';

import './landing_page.html';

Template.landing_page.onRendered(function () {
  $('body').css('overflow-y', 'hidden');
  // everything is loaded
  window.onload = function () {
    setTimeout(() => {
      $('body').css('overflow-y', 'scroll');
      $(document).scrollTop(0);
      $('.loader-wrapper').fadeOut('slow');
      $('.slogan').removeClass('notloaded');

      if (!window.detectmob) {
        // $('.what_happen').hide();
        // $('.why_is_there').hide();
        // $('.why_is_this').hide();
        // $('.how_can_we').hide();
        // $('.join_us').hide();
      }

      $('.vet_photo .changing').click(function(){
        alert('asfhsdjfg');
      });

    }, 1000);
  }
});

Template.landing_page.helpers({
  'chef_signup': function() {
    
  }
})

Template.registerHelper('isCurrentUser', function () {
  return (localStorage.getItem("loggedIn").toLowerCase() === 'true');
});
