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
    BlazeLayout.render('screen',{render_component:"show_room"});
  }
});

FlowRouter.route('/profile',{
  name: 'Create profile',
  action() {
    BlazeLayout.render('screen',{render_component:"profile"});
  }
});

FlowRouter.route('/make_dish',{
  name: 'Make dish',
  action() {
    BlazeLayout.render('screen',{render_component:'create_dishes_form'});
  }
});

FlowRouter.route('/create_menu',{
  name: 'Create menu',
  action() {
    BlazeLayout.render('screen',{render_component:'menu_creation'});
  }
});

FlowRouter.route('/card', {
  name: 'Card',
  action () {
    BlazeLayout.render('dishes_list');
  }
});
