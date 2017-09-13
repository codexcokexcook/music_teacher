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

FlowRouter.route('/loop', {
  name: 'dishes list',
  action() {
    BlazeLayout.render('ingredients_loop')
  }
});

/** FlowRouter.route('/test', {
    name: 'test',
    action() {
        BlazeLayout.render('main_layout', {main:'display_ingredients'})
    }
}); **/
