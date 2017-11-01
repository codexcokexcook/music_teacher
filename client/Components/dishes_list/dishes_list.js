import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

Template.dishes_list.onRendered(function(){
  $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        $('ul.tabs').tabs();
      },
      complete: function() {} // Callback for Modal close
    }
  );

})

Template.dishes_card.helpers ({
  'dish_details': function () {
    var returned_dish_id = Session.get('dish_id');
    var get_dish_details = Dishes.findOne({"_id":returned_dish_id});
    return get_dish_details;
  }
});

Template.chef_avatar.helpers({
  'chef_avatar': function () {
    var returned_dish_id = Session.get('dish_id');
    var get_dish_details = Dishes.findOne({"_id":returned_dish_id});
    var get_dish_creator = get_dish_details && get_dish_details.user_id;
    var get_profile_images = profile_images.findOne({"userId": get_dish_creator});
    var get_profile_images_id = get_profile_images && get_profile_images._id;
    var get_profile_images_ext = get_profile_images && get_profile_images.extensionWithDot;
    var get_profile_images_name = get_profile_images_id + get_profile_images_ext;
    return get_profile_images_name;
  }
});

Template.info_tabs.onRendered(function(){
  this.$('ul.tabs').tabs();
});


Template.dishes_rotation.onRendered(function(){
  var first_dish_display = Dishes.findOne({});
  var first_dish_id = first_dish_display._id;
  Session.set('dish_id',first_dish_id);
});

Template.dishes_rotation.events({
  'click .dish_thumbnail': function () {
    var dish_id = this._id;
    Session.set('dish_id', dish_id);
  }
});

Template.ingredients_loop.helpers ({
  'get_ingredients': function () {
    var extract_dish = Dishes.findOne({"dish_name":this.dish_name});
    var extract_dish_name = extract_dish.dish_name;
    return Ingredients.find({"dish_name":extract_dish_name});
  }
});

Template.service_info.onRendered(function(){
var serving_option = this.serving_option;
/**  if this.serving_option.value = "Delivery" {
    document.getSVGDocument().getElementById("pick_up_option").style.color=rgba(0,0,0,0.18);
  } **/
});
