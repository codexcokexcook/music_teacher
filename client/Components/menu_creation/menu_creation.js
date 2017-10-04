import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Blaze } from 'meteor/blaze';

Menu = new Mongo.Collection('menu');

/*Template.menu_creation.onRendered (function() {
   this.$('.carousel').carousel({
     dist: 0,
     noWrap: false,
     padding: 24
   });
});

Template.menu_carousel.onRendered(function(){
  Blaze.render(Template.menu_initiation, document.getElementById('card_container'));
});

Template.menu_initiation.events({
  'click .btn-floating': function(template) {
    Blaze.render(Template.menu_creation_content, document.getElementById('card_container'))
    Blaze.render(Template.dishes_selection, document.getElementById('dishes_selection'));
    Blaze.remove(Template.instance().view);
    var user_id = Meteor.userId();
    var dishes_id = "";
    Temp_menu.insert({
      user_id : user_id,
      createdAt : new Date(),
      dishes_id: "",
    },function(err, docsInserted){ //docsInserted to return Document Id once inserted
      Session.set('current_menu_id',docsInserted)
    });
  }
});
*/

Template.dishes_selection.events({
  'change .dish_checkbox': function(event, template) {
    var checked_dishes = template.findAll("input[type=checkbox]:checked");
    var checked_values = checked_dishes.map(function(selection){
      return selection.value;
    });
  }
});

Template.dishes_selection.helpers({
  'user_dishes': function() {
    var current_user = Meteor.userId();
    var user_dishes = Dishes.find({"user_id": current_user});
    return user_dishes;
  }
});
