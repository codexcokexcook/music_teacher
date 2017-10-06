import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Blaze } from 'meteor/blaze';
import { Tracker } from 'meteor/tracker';

Menu = new Mongo.Collection('menu');

Template.menu_creation.onRendered(function(){
  if (Menu.find({})) {
    Blaze.render(Template.view_menu, document.getElementById('card_container'));
    alert('have record');
  } else {
    Blaze.render(Template.menu_initiation, document.getElementById('card_container'));
    alert('no records');
  }
});


Template.menu_initiation.events({
  'click #add_menu': function(template) {
    Blaze.render(Template.menu_creation_content, document.getElementById('card_container'));
    Blaze.remove(Template.instance().view);
  }
});

Template.menu_creation_content.onRendered(function(){
  this.$('select').material_select();
  this.$('.modal').modal();
});

Template.menu_creation_content.events({
  'click #cancel': function(template) {
    Blaze.remove(Template.instance().view);
  },
  'click #add_dish': function(template) {
    Blaze.render(Template.create_dish_modal, document.getElementById('cancel'));
  },
  'click #create_menu': function(event, template) {
    event.preventDefault;
    var menu_name = $('#menu_name').val();
    var createdBy = Meteor.userId();
    var menu_selling_price = $('#menu_selling_price').val();
    var min_order = $('#min_order_range').val();
    var lead_hours = $('#lead_time_hours_range').val();
    var lead_days = $('#lead_time_days_range').val();
    var dishes_id = Session.get('selected_dishes_id');

    Meteor.call('menu.insert',menu_name, createdBy, menu_selling_price, min_order, lead_hours,lead_days,dishes_id);

    Blaze.render(Template.view_menu, document.getElementById('card_container'));
    Blaze.remove(Template.instance().view);
  }
});

Template.dishes_selection.events({
  'change .dish_checkbox': function(event, template) {
    var checked_dishes = template.findAll("input[type=checkbox]:checked");
    var checked_values = checked_dishes.map(function(selection){
      return selection.value;
    });
    Session.set('selected_dishes_id', checked_values);
  }
});

Template.dishes_selection.helpers({
  'user_dishes': function() {
    var current_user = Meteor.userId();
    var user_dishes = Dishes.find({"user_id": current_user});
    return user_dishes;
  }
});

Template.view_menu.onRendered(function(){
  this.$('.collapsible').collapsible();
});

Template.view_menu.helpers({
  'menu_retreival': function() {
    return Menu.find();
  },
  'dishes_retreival': function() {
        var dishes_id = String(this); //converted single object of dish id to string ***important***
        var find_dishes = Dishes.findOne({"_id": dishes_id});
        return find_dishes;
  }
});
