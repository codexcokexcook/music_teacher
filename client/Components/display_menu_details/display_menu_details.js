import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

Template.display_menu_details.onRendered(function(){
  $('.carousel').carousel({
    dist: 0,
    shift: 20
  });
  Blaze.render(Template.dishes_card,$('.menu_dish_card_wrapper')[0]);
  var menu_id = Menu.findOne({_id:Session.get('menu_id')});
  var first_dish = menu_id.dishes_id[0];
  Session.set('dish_id',first_dish);
  if ($('.menu_dish_card_wrapper #dish_card_action')) {
    $('.menu_dish_card_wrapper #dish_card_action').remove();
  }
  $('.dish_card_large').addClass('z-depth-0');
  $('.dish_card_large').css("height", "393px");
  $('.price_tag').detach();
  $('#dish_card_large .card-content h5').replaceWith(function(){
    return '<h6>'+$(this).html()+'</h6>';
  })
});

Template.display_menu_details.helpers({
  'menu_details': function() {
    var menu_id = Session.get('menu_id');
    return menu_details = Menu.findOne({_id: menu_id});
  },

  'image_details': function() {
    var image_id = String(this)
    return Images.find({_id: image_id});
  }
});

Template.display_menu_details.events({
  'click .menu_dishes_images': function(event) {
    image_id = event.target.id;
    dish_info = Dishes.findOne({image_id: image_id});
    dish_id = dish_info._id;
    Session.set('dish_id', dish_id);
  }
})
