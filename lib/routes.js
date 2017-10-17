import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/smallcard', {
  name: 'small card',
  action() {
    BlazeLayout.render('small_dish_card')
  }
});
/**
FlowRouter.route('/list', {
  name: 'dishes list',
  action() {
    BlazeLayout.render('dishes_list')
  }
});

FlowRouter.route('/location', {
  name: 'location',
  action() {
    BlazeLayout.render('location')
  }
});

FlowRouter.route('/mapcard', {
  name: 'mapcard',
  action() {
    BlazeLayout.render('mapcard')
  }
});

**/

// Landing Page
FlowRouter.route('/',{
  name: 'Landing Page',
  action(){
    BlazeLayout.render('landing_page')
  }
});

//Signup page
FlowRouter.route('/signup',{
  name: 'Sign up',
  action(){
    BlazeLayout.render('accounts_form', {navbar: 'signup_navbar', content: 'signup_content'});
  }
});

//Verification sent Page
FlowRouter.route('/sent_verification',{
  name: 'sent_verification',
  action(){
    BlazeLayout.render('accounts_form', {navbar: 'sent_verification_navbar', content: 'sent_verification_content'});
  }
});


//Login Page
FlowRouter.route('/login',{
  name: 'Login',
  action(){
    BlazeLayout.render('accounts_form', {navbar: 'bp_navbar', content: 'login_content'});
  }
});

//Chat Bot
FlowRouter.route('/msgDialog',{
  name: 'msgDialog',
  action(){
    BlazeLayout.render('msgDialog')
  }
});



//
/** FlowRouter.route('/test', {
    name: 'test',
    action() {
        BlazeLayout.render('main_layout', {main:'display_ingredients'})
    }
}); **/
