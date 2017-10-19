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
  name: 'Home',
  action(){
    BlazeLayout.render('main');
  }
});

FlowRouter.route('/profile',{
  name: 'Create profile',
  action() {
    BlazeLayout.render('bp_navbar');
  }
});

FlowRouter.route('/make_dish',{
  name: 'Make dish',
  action() {
    BlazeLayout.render('create_dishes_form');
  }
});

FlowRouter.route('/create_menu',{
  name: 'Create menu',
  action() {
    BlazeLayout.render('menu_creation');
  }
});
