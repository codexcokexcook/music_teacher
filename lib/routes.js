import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'create dishes',
  action() {
    BlazeLayout.render('create_dishes_form')
  }
});

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

FlowRouter.route('/sign_up',{
  name: 'Sign up',
  action(){
    BlazeLayout.render('signup_form')
  }
});

FlowRouter.route('/login',{
  name: 'Login',
  action(){
    BlazeLayout.render('login_form')
  }
});

FlowRouter.route('/msgdialog',{
  name: 'msgdialog',
  action(){
    BlazeLayout.render('msgDialog')
  }
});

/** FlowRouter.route('/test', {
    name: 'test',
    action() {
        BlazeLayout.render('main_layout', {main:'display_ingredients'})
    }
}); **/
