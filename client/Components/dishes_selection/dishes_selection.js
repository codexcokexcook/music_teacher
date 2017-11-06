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
    return false;
  },
  'click #edit_dish': function() {
    var get_dish_id = this._id;
    var session_object = [];
    session_object[0] = get_dish_id; //Convert this._id (string) to an object
    Session.set('selected_dishes_id', session_object);
    $('.btn_edit_dish').click();
    $('#edit_dish_modal').modal('open'); //Need to trigger modal thru js to make it work
  }
});

Template.dishes_selection.helpers({
  'checkbox_id': function() {
    var checkbox_id = Template.instance().view.parentView.name + "_" + this._id;
    return checkbox_id;
  },
  'user_dishes': function() {
    var current_user = Meteor.userId();
    var user_dishes = Dishes.find({"user_id": current_user});
    return user_dishes;
  }
});
