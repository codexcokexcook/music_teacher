Template.menu_list.onCreated(function() {
  this.user_menus = this.subscribe('getListMenus');
})

Template.menu_list.onRendered(function() {
  this.$('select').material_select();
})

Template.menu_list.helpers({
  'user_menus': function() {
    var current_user = Meteor.userId();
    var user_menus = Menu.find({"user_id": current_user, "deleted": false});
    return user_menus;
  },
  'subscription': function() {
    return Template.instance().user_menus.ready();
  },
  'checkbox_id': function() {
    var checkbox_id = Template.instance().view.parentView.name + "_" + this._id;
    return checkbox_id;
  },
})

Template.menu_list.events({
  'change .menus_checkbox': function(event, template) {
    var checked_menus = template.findAll("input[class=menus_checkbox]:checked")
    var checked_values = checked_menus.map(function(selection){
      return selection.value;
    });
    Session.set('selected_menus_id', checked_values);
  }
})
