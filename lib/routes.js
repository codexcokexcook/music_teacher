import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Accounts } from 'meteor/accounts-base';

FlowRouter.route('/',{
  name: 'Landing Page',
  action(){
    BlazeLayout.render('landing_page')
  }
});

FlowRouter.route('/verify-email/:token',{
  name: 'verify-email',
  action(params) {
    Accounts.verifyEmail(params.token ,(error) => {
      if (error) {
        Materialize.toast(error.reason, 4000);
      } else {
        FlowRouter.go('/sent_verification');
      }
    });
  }
});

FlowRouter.route('/sent_verification',{
  name: 'Account verified',
  action() {
    BlazeLayout.render('sent_verification');
  }
});

FlowRouter.route('/main',{
  name: 'Main',
  action(){
    BlazeLayout.render('screen',{navbar:"bp_navbar", render_component:"show_room"});
  }
});

FlowRouter.route('/profile',{
  name: 'Profile',
  action() {
    BlazeLayout.render('screen',{navbar:"bp_navbar", render_component:"profile"});
  }
});

FlowRouter.route('/dishes_summary',{
  name: 'Dishes Summary',
  action() {
    BlazeLayout.render('screen',{navbar:"bp_navbar", render_component:'dishes_summary'});
  }
});

FlowRouter.route('/create_menu',{
  name: 'Create menu',
  action() {
    BlazeLayout.render('screen',{navbar:"bp_navbar", render_component:'menu_creation'});
  }
});

FlowRouter.route('/card', {
  name: 'Card',
  action () {
    BlazeLayout.render('dishes_list');
  }
});

FlowRouter.route('/cprofile',{
  name: 'Create profile',
  action() {
    BlazeLayout.render('create_profile');
  }
});

FlowRouter.route('/profilec',{
  name: 'Profile_card',
  action() {
    BlazeLayout.render('profile_card');
  }
});
