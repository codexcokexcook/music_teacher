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

  if (this.view.parentView.parentView.parentView.name == "Template.show_room_menu" || this.view.parentView.parentView.parentView.name == "Template.profile_created_menus") {
    this.$('.carousel.carousel-slider').carousel({fullWidth: true});
    //$('.card').addClass('hoverable');
    remove_dropdown = $('.dropdown_element').detach();
    remove_status_switch = $('.online_status').detach();
  }
  if (this.view.parentView.parentView.parentView.name == "Template.view_menu") {
    this.$('.carousel.carousel-slider').carousel({fullWidth: true});
    remove_order = $('#menu_card .card-action').detach();
  }
});

Template.menu_card.events({
  'click #delete_menu': function () {
      $('#delete_confirmation_menu').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
      });
      $('#delete_confirmation_menu').modal('open');
      sessionStorage.setItem("deletedMenuID", this._id);
  },
  'click #confirm_delete_menu': function() {
    Meteor.call('menu.delete', sessionStorage.getItem("deletedMenuID"), function(err, result){
      if (err) {
          Materialize.toast('Error occur when delete the menu. Please try again. ' + err.message, 4000, 'rounded red lighten-2');
      } else {
          if (result) { //delete done
            Materialize.toast('Delete success!', 4000, 'rounded red lighten-2');
          } else { //delete undone
            Materialize.toast('Error occur when delete the menu. Please try again.', 4000, 'rounded red lighten-2');
          }
      }
    })
    // Menu.remove(this._id);
    $('edit_menu_modal').modal('close');
    $('#delete_confirmation_menu').modal('close');
    sessionStorage.clear();
  },
  'click #edit_menu': function () {
    $('edit_menu_modal').modal('open')
    Session.set('menu_id', this._id);
    Session.set('dishes_id', this.dishes_id);
  },
  'click #menu_order': function () {
    if ($('#dish_card_large')){
      $('#dish_card_large').remove();
    }
    Session.set('user_id', this.user_id);
    Session.set('menu_id', this._id)

    Blaze.render(Template.display_menu_details,$('#menu_card_display')[0]);
  }
});

Template.menu_card.helpers({
  'dishes_retreival': function() {
    var dishes_id = String(this); //converted single object of dish id to string ***important***
    var find_dishes = Dishes.findOne({"_id": dishes_id, "deleted": false});
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
    var homecook_image = profile_images.findOne({
      'userId': this.user_id,
      'meta.purpose': 'homecook_profile_picture'
    });
    if (homecook_image) {
      return homecook_image.meta.base64;
    }
  }
});
