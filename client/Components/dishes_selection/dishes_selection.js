Template.dishes_selection.onRendered(function(){
  this.$('select').material_select();
});

Template.dishes_selection.events({
  'change .dishes_checkbox': function(event, template) {
    var checked_dishes = template.findAll("input[type=checkbox]:checked");
    var checked_values = checked_dishes.map(function(selection){
    return selection.value;
  });
  Session.set('selected_dishes_id', checked_values);
  },
  'click #delete_dish': function () {
    Meteor.call('dish.remove', this._id);
    Meteor.call('dish_image.remove', this.image_id);
  },
  'click #edit_dish': function() {
    Session.set('selected_dishes_id', this._id);
    $("#btn_edit_dish").click();
    return false;
  }
});

Template.dishes_selection.helpers({
  'user_dishes': function() {
    var current_user = Meteor.userId();
    var user_dishes = Dishes.find({"user_id": current_user});
    return user_dishes;
  }
});
