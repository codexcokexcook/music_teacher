import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Blaze } from 'meteor/blaze';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.menu_card.onRendered(function(){
  $('div.modal').scrollTop(0);
  this.$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: true, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'right', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  });
  this.$('.carousel.carousel-slider').carousel({fullWidth: true});
  if (this.view.parentView.parentView.parentView.name == "Template.show_room_menu") {
    $('.card').addClass('hoverable');
    remove_dropdown = $('.dropdown_element').detach();
  }
  if (this.view.parentView.parentView.parentView.name == "Template.view_menu") {
    remove_order = $('.card-action').detach();
  }
});

Template.menu_card.events({
  'click #delete_menu': function () {
    Menu.remove(this._id);
    $('edit_menu_modal').modal('close');
  },
  'click #edit_menu': function () {
    $('edit_menu_modal').modal('open')
    Session.set('menu_id', this._id);
    Session.set('dishes_id', this.dishes_id);
  },
  'click #menu_card': function() {
    if($('.dropdown_element').length === 0) {
      var route = '/' + this.user_id + '/menu/' + this._id;
      FlowRouter.go(window.open(route,'_blank'));
    }
  }
});

Template.menu_card.helpers({
  'dishes_retreival': function() {
    var dishes_id = String(this); //converted single object of dish id to string ***important***
    var find_dishes = Dishes.findOne({"_id": dishes_id});
    return find_dishes;
  },
  'edit_current_menu': function() {
    return Menu.findOne({"_id": this._id});
  },
  'image_retreival': function() {
    var image_id = String(this);
    var find_images = Images.findOne({"_id": image_id})
    return find_images;
  },
  'get_homecook_image': function() {
    var homecook_image = profile_images.findOne({userId: this.user_id, meta:{purpose: "homecook_profile_picture"}});
    if (homecook_image) {
      return homecook_image._id + homecook_image.extensionWithDot;
    }
  }
});
